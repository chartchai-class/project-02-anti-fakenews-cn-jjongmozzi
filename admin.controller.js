// backend/controllers/admin.controller.js
const db = require('../config/db');
const { recalculateNewsStatus } = require('./votes.controller'); // 复用函数

// 将 reader 升级为 member
exports.upgradeUserToMember = (req, res) => {
    const { id } = req.params;

    db.run(
        "UPDATE users SET role = 'member' WHERE id = ? AND role = 'reader'",
        [id],
        function (err) {
            if (err) return res.status(500).json({ error: 'Failed to upgrade user' });
            if (this.changes === 0) {
                return res.status(400).json({ error: 'User not found or already a member/admin' });
            }
            res.json({ message: 'User upgraded to member' });
        }
    );
};

// 软删除新闻（仅管理员可见）
exports.deleteNews = (req, res) => {
    const { id } = req.params;

    db.run(
        'UPDATE news SET is_deleted = 1 WHERE id = ?',
        [id],
        function (err) {
            if (err) return res.status(500).json({ error: 'Failed to delete news' });
            if (this.changes === 0) {
                return res.status(404).json({ error: 'News not found' });
            }
            res.json({ message: 'News deleted' });
        }
    );
};

// 删除评论（即删除 vote 中的 comment_text）
exports.deleteComment = (req, res) => {
    const { id } = req.params; // vote id

    // 先获取 news_id 用于重算
    db.get('SELECT news_id FROM votes WHERE id = ?', [id], (err, row) => {
        if (!row) return res.status(404).json({ error: 'Comment not found' });

        const newsId = row.news_id;

        // 清空评论内容（保留投票）
        db.run(
            'UPDATE votes SET comment_text = NULL, comment_image = NULL WHERE id = ?',
            [id],
            function (err) {
                if (err) return res.status(500).json({ error: 'Failed to delete comment' });

                // 重要：重新计算假新闻状态
                recalculateNewsStatus(newsId, (err) => {
                    if (err) console.error('Recalc error:', err);
                    res.json({ message: 'Comment deleted and vote recalculated' });
                });
            }
        );
    });
};