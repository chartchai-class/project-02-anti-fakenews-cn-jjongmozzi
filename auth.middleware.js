// backend/middlewares/auth.middleware.js
const jwt = require('jsonwebtoken');
const config = require('../config/env');

/**
 * 验证 JWT Token 并挂载 req.user
 * 要求 Header: Authorization: Bearer <token>
 */
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // 提取 "Bearer TOKEN" 中的 TOKEN

    if (!token) {
        return res.status(401).json({ error: 'Access token required' });
    }

    jwt.verify(token, config.jwtSecret, (err, user) => {
        if (err) {
            // token 过期或无效
            if (err.name === 'TokenExpiredError') {
                return res.status(403).json({ error: 'Token expired' });
            }
            return res.status(403).json({ error: 'Invalid token' });
        }

        // 将用户信息挂载到 req 对象，供控制器使用
        req.user = user; // { id, email, role }
        next();
    });
}

/**
 * 角色权限校验中间件工厂函数
 * @param {string[]} allowedRoles - 允许的角色列表，如 ['admin', 'member']
 * @returns {Function} Express 中间件
 */
function authorizeRole(allowedRoles) {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ error: 'Authentication required' });
        }

        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ error: 'Insufficient permissions' });
        }

        next();
    };
}

module.exports = {
    authenticateToken,
    authorizeRole,
};