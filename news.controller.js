// backend/controllers/news.controller.js
const db = require('../config/db');
const path = require('path');

// 工具函数：计算 fake 状态
function calculateFakeStatus(fakeCount, notFakeCount) {
    if (fakeCount > notFakeCount) return 'fake';
    return 'not-fake';
}

exports.getNewsList = (req, res) => {
    const { page = 1, limit = 10, status = 'all', q = '' } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);

    let baseQuery = `
    SELECT n.*, u.name as reporter_name,
           COUNT(v.id) as total_votes,
           SUM(CASE WHEN v.is_fake = 1 THEN 1 ELSE 0 END) as fake_votes,
           SUM(CASE WHEN v.is_fake = 0 THEN 1 ELSE 0 END) as not_fake_votes
    FROM news n
    JOIN users u ON n.reporter_id = u.id
    LEFT JOIN votes v ON n.id = v.news_id
    WHERE n.is_deleted = 0
  `;
    const countQuery = `
    SELECT COUNT(*) as total FROM news WHERE is_deleted = 0
  `;

    const params = [];
    if (status !== 'all') {
        baseQuery += ` AND n.status = ?`;
        params.push(status);
    }
    if (q) {
        baseQuery += ` AND (n.title LIKE ? OR n.summary LIKE ? OR u.name LIKE ?)`;
        params.push(`%${q}%`, `%${q}%`, `%${q}%`);
    }

    // 添加分组和排序
    baseQuery += ` GROUP BY n.id ORDER BY n.created_at DESC LIMIT ? OFFSET ?`;
    params.push(parseInt(limit), offset);

    // 获取总数（用于分页）
    db.get(countQuery, (err, countRow) => {
        if (err) return res.status(500).json({ error: 'Failed to fetch news count' });

        db.all(baseQuery, params, (err, rows) => {
            if (err) return res.status(500).json({ error: 'Failed to fetch news' });

            const newsList = rows.map(row => ({
                ...row,
                status: calculateFakeStatus(row.fake_votes || 0, row.not_fake_votes || 0),
                image_url: row.image_url ? `/uploads/${path.basename(row.image_url)}` : null,
            }));

            res.json({
                data: newsList,
                pagination: {
                    currentPage: parseInt(page),
                    totalPages: Math.ceil(countRow.total / limit),
                    totalItems: countRow.total,
                    itemsPerPage: parseInt(limit),
                },
            });
        });
    });
};

exports.getNewsById = (req, res) => {
    const { id } = req.params;

    // 获取新闻详情
    db.get(
        `SELECT n.*, u.name as reporter_name
     FROM news n
     JOIN users u ON n.reporter_id = u.id
     WHERE n.id = ? AND n.is_deleted = 0`,
        [id],
        (err, news) => {
            if (err || !news) {
                return res.status(404).json({ error: 'News not found' });
            }

            // 获取投票统计
            db.get(
                `SELECT 
          COUNT(*) as total_votes,
          SUM(CASE WHEN is_fake = 1 THEN 1 ELSE 0 END) as fake_votes,
          SUM(CASE WHEN is_fake = 0 THEN 1 ELSE 0 END) as not_fake_votes
         FROM votes WHERE news_id = ?`,
                [id],
                (err, voteStats) => {
                    if (err) voteStats = { total_votes: 0, fake_votes: 0, not_fake_votes: 0 };

                    // 获取评论（即带 comment_text 的投票）
                    db.all(
                        `SELECT v.comment_text, v.comment_image, v.created_at, u.name as user_name, u.avatar
             FROM votes v
             JOIN users u ON v.user_id = u.id
             WHERE v.news_id = ? AND v.comment_text IS NOT NULL
             ORDER BY v.created_at DESC`,
                        [id],
                        (err, comments) => {
                            if (err) comments = [];

                            const result = {
                                ...news,
                                status: calculateFakeStatus(voteStats.fake_votes || 0, voteStats.not_fake_votes || 0),
                                image_url: news.image_url ? `/uploads/${path.basename(news.image_url)}` : null,
                                vote_stats: {
                                    total: voteStats.total_votes || 0,
                                    fake: voteStats.fake_votes || 0,
                                    not_fake: voteStats.not_fake_votes || 0,
                                },
                                comments: comments.map(c => ({
                                    ...c,
                                    comment_image: c.comment_image ? `/uploads/${path.basename(c.comment_image)}` : null,
                                })),
                            };

                            res.json(result);
                        }
                    );
                }
            );
        }
    );
};

// 仅 member 可发布
exports.createNews = (req, res) => {
    const { title, summary } = req.body;
    const reporterId = req.user.id; // 来自 auth middleware

    if (!title || !summary) {
        return res.status(400).json({ error: 'Title and summary are required' });
    }

    const imageUrl = req.file ? req.file.path : null;

    db.run(
        'INSERT INTO news (title, summary, reporter_id, image_url) VALUES (?, ?, ?, ?)',
        [title, summary, reporterId, imageUrl],
        function (err) {
            if (err) return res.status(500).json({ error: 'Failed to create news' });
            res.status(201).json({ id: this.lastID, message: 'News created' });
        }
    );
};