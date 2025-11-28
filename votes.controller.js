// backend/controllers/votes.controller.js
const db = require('../config/db');
const path = require('path');

// 重新计算新闻 fake 状态
function recalculateNewsStatus(newsId, callback) {
    db.get(
        `SELECT 
      SUM(CASE WHEN is_fake = 1 THEN 1 ELSE 0 END) as fake_votes,
      SUM(CASE WHEN is_fake = 0 THEN 1 ELSE 0 END) as not_fake_votes
     FROM votes WHERE news_id = ?`,
        [newsId],
        (err, row) => {
            if (err) return callback(err);

            const status = (row.fake_votes > row.not_fake_votes) ? 'fake' : 'not-fake';
            db.run(
                'UPDATE news SET status = ? WHERE id = ?',
                [status, newsId],
                callback
            );
        }
    );
}

exports.submitVote = (req, res) => {
    const { newsId, isFake } = req.body;
    const userId = req.user.id;
    const commentText = req.body.comment || null;
    const commentImage = req.file ? req.file.path : null;

    if (typeof isFake !== 'boolean') {
        return res.status(400).json({ error: 'isFake must be true or false' });
    }

    // 检查新闻是否存在且未删除
    db.get('SELECT id FROM news WHERE id = ? AND is_deleted = 0', [newsId], (err, news) => {
        if (!news) return res.status(404).json({ error: 'News not found' });

        // 插入或替换投票（UNIQUE(user_id, news_id)）
        db.run(
            `INSERT INTO votes (user_id, news_id, is_fake, comment_text, comment_image)
       VALUES (?, ?, ?, ?, ?)
       ON CONFLICT(user_id, news_id) DO UPDATE SET
         is_fake = excluded.is_fake,
         comment_text = excluded.comment_text,
         comment_image = excluded.comment_image`,
            [userId, newsId, isFake ? 1 : 0, commentText, commentImage],
            function (err) {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ error: 'Failed to submit vote' });
                }

                // 重新计算新闻状态
                recalculateNewsStatus(newsId, (err) => {
                    if (err) console.error('Failed to recalculate status:', err);
                    res.json({ message: 'Vote submitted successfully', voteId: this.lastID || 'updated' });
                });
            }
        );
    });
};