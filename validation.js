// backend/utils/validation.js
const yup = require('yup');

// 注册请求校验
const registerSchema = yup.object({
    name: yup.string().trim().min(2, 'Name must be at least 2 characters').max(50).required('Name is required'),
    email: yup.string().email('Invalid email format').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

// 登录请求校验
const loginSchema = yup.object({
    email: yup.string().email().required('Email is required'),
    password: yup.string().required('Password is required'),
});

// 创建新闻校验
const createNewsSchema = yup.object({
    title: yup.string().trim().min(5, 'Title too short').max(200).required('Title is required'),
    summary: yup.string().trim().min(10, 'Summary too short').max(1000).required('Summary is required'),
    // 注意：image 字段由 Multer 处理，不在 body 中，故不在此校验
});

// 投票请求校验
const voteSchema = yup.object({
    newsId: yup.number().integer().positive().required('Valid newsId is required'),
    isFake: yup.boolean().required('isFake must be true or false'),
    comment: yup.string().nullable().max(500, 'Comment too long'), // 可选
});

// 升级用户（管理员操作）
const upgradeUserSchema = yup.object({
    id: yup.number().integer().positive().required('User ID is required'),
});

// 删除操作（通用 ID 校验）
const idSchema = yup.object({
    id: yup.number().integer().positive().required('ID is required'),
});

// 导出验证函数（自动抛出错误）
async function validateRegister(data) {
    return await registerSchema.validate(data, { abortEarly: false });
}

async function validateLogin(data) {
    return await loginSchema.validate(data, { abortEarly: false });
}

async function validateCreateNews(data) {
    return await createNewsSchema.validate(data, { abortEarly: false });
}

async function validateVote(data) {
    return await voteSchema.validate(data, { abortEarly: false });
}

async function validateUpgradeUser(data) {
    return await upgradeUserSchema.validate(data, { abortEarly: false });
}

async function validateIdParam(data) {
    return await idSchema.validate(data, { abortEarly: false });
}

module.exports = {
    validateRegister,
    validateLogin,
    validateCreateNews,
    validateVote,
    validateUpgradeUser,
    validateIdParam,
};