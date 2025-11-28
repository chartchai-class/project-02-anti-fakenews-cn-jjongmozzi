// backend/controllers/auth.controller.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const config = require('../config/env');
const yup = require('yup');

// 注册验证 Schema
const registerSchema = yup.object({
    name: yup.string().required('Name is required'),
    email: yup.string().email().required('Valid email is required'),
    password: yup.string().min(6).required('Password at least 6 characters'),
});

// 登录验证 Schema
const loginSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required(),
});

exports.register = async (req, res) => {
    try {
        await registerSchema.validate(req.body, { abortEarly: false });
        const { name, email, password } = req.body;

        // 检查邮箱是否已存在
        db.get('SELECT id FROM users WHERE email = ?', [email], async (err, row) => {
            if (row) {
                return res.status(400).json({ error: 'Email already registered' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            db.run(
                'INSERT INTO users (name, email, password, role, avatar) VALUES (?, ?, ?, ?, ?)',
                [name, email, hashedPassword, 'reader', null],
                function (err) {
                    if (err) {
                        return res.status(500).json({ error: 'Registration failed' });
                    }
                    res.status(201).json({ message: 'User registered successfully', userId: this.lastID });
                }
            );
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: error.errors });
        }
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.login = async (req, res) => {
    try {
        await loginSchema.validate(req.body, { abortEarly: false });
        const { email, password } = req.body;

        db.get('SELECT id, name, email, password, role, avatar FROM users WHERE email = ?', [email], async (err, user) => {
            if (!user) {
                return res.status(401).json({ error: 'Invalid email or password' });
            }

            const isValid = await bcrypt.compare(password, user.password);
            if (!isValid) {
                return res.status(401).json({ error: 'Invalid email or password' });
            }

            // 生成 JWT
            const token = jwt.sign(
                { id: user.id, email: user.email, role: user.role },
                config.jwtSecret,
                { expiresIn: '7d' }
            );

            res.json({
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    avatar: user.avatar,
                },
            });
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: error.errors });
        }
        res.status(500).json({ error: 'Login failed' });
    }
};