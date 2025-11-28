// backend/routes/admin.routes.js
const express = require('express');
const {
    upgradeUserToMember,
    deleteNews,
    deleteComment
} = require('../controllers/admin.controller');
const { authenticateToken } = require('../middlewares/auth.middleware');
const { authorizeRole } = require('../middlewares/auth.middleware');

const router = express.Router();

// 仅限 admin 操作
router.patch(
    '/users/:id/upgrade-to-member',
    authenticateToken,
    authorizeRole(['admin']),
    upgradeUserToMember
);

router.delete(
    '/news/:id',
    authenticateToken,
    authorizeRole(['admin']),
    deleteNews
);

router.delete(
    '/comments/:id', // :id 是 vote 的 ID
    authenticateToken,
    authorizeRole(['admin']),
    deleteComment
);

module.exports = router;