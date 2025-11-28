// backend/utils/jwt.util.js
const jwt = require('jsonwebtoken');
const config = require('../config/env');

/**
 * 生成 JWT Token
 * @param {Object} payload - 要编码的数据（如 { id, email, role }）
 * @param {string} [expiresIn='7d'] - 过期时间（默认 7 天）
 * @returns {string} JWT token
 */
function generateToken(payload, expiresIn = '7d') {
    return jwt.sign(payload, config.jwtSecret, { expiresIn });
}

/**
 * 验证并解码 JWT Token（通常由中间件处理，此处备用）
 * @param {string} token
 * @returns {Object|null} 解码后的 payload 或 null
 */
function verifyToken(token) {
    try {
        return jwt.verify(token, config.jwtSecret);
    } catch (err) {
        return null;
    }
}

module.exports = {
    generateToken,
    verifyToken,
};