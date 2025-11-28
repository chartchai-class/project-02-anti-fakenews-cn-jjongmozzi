// backend/middlewares/error.middleware.js

/**
 * 全局错误处理中间件（必须放在所有路由之后）
 * @param {Error} err - 错误对象
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
function errorHandler(err, req, res, next) {
    // 如果响应头已发送，交给默认错误处理器
    if (res.headersSent) {
        return next(err);
    }

    // 默认状态码和消息
    let statusCode = err.status || 500;
    let message = err.message || 'Internal Server Error';

    // 特殊处理 Multer 上传错误
    if (err.code === 'LIMIT_FILE_SIZE') {
        statusCode = 400;
        message = 'File too large. Maximum size is 5MB.';
    } else if (err.message && err.message.includes('Only image files are allowed')) {
        statusCode = 400;
        message = err.message;
    }

    // 开发环境打印堆栈
    if (process.env.NODE_ENV === 'development') {
        console.error('[ERROR]', err.stack || err.toString());
    }

    // 返回统一 JSON 错误格式
    res.status(statusCode).json({
        success: false,
        status: statusCode,
        message: message,
        // 开发环境暴露堆栈（生产环境隐藏）
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
}

module.exports = {
    errorHandler,
};