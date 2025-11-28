// backend/routes/news.routes.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const { getNewsList, getNewsById, createNews } = require('../controllers/news.controller');
const { authenticateToken } = require('../middlewares/auth.middleware');
const { authorizeRole } = require('../middlewares/auth.middleware'); // 角色校验

// 图片上传配置：仅允许 jpg/jpeg/png
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        const name = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, name + ext);
    }
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png/;
        const ext = path.extname(file.originalname).toLowerCase();
        if (allowedTypes.test(ext)) {
            cb(null, true);
        } else {
            cb(new Error('Only .jpg, .jpeg, .png files are allowed!'), false);
        }
    },
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

const router = express.Router();

// 公开路由：无需登录
router.get('/', getNewsList);           // GET /api/news?status=...&q=...&page=...
router.get('/:id', getNewsById);        // GET /api/news/123

// 受保护路由：需登录且为 'member' 或 'admin'
router.post(
    '/',
    authenticateToken,
    authorizeRole(['member', 'admin']),
    upload.single('image'), // 对应前端 <input name="image">
    createNews
);

module.exports = router;