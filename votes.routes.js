// backend/routes/votes.routes.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const { submitVote } = require('../controllers/votes.controller');
const { authenticateToken } = require('../middlewares/auth.middleware');

// 评论图片上传配置
const commentStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        const name = 'comment-' + Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, name + ext);
    }
});

const uploadCommentImage = multer({
    storage: commentStorage,
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png/;
        const ext = path.extname(file.originalname).toLowerCase();
        if (allowedTypes.test(ext)) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed for comments!'), false);
        }
    },
    limits: { fileSize: 2 * 1024 * 1024 } // 2MB
});

const router = express.Router();

// 提交投票（可附带评论和图片）
router.post(
    '/',
    authenticateToken,
    uploadCommentImage.single('commentImage'), // 前端字段名：commentImage
    submitVote
);

module.exports = router;