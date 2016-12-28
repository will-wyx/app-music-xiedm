/**
 * Created by WILL on 2016/12/20.
 */
const express = require('express');
const router = express.Router();
const db = require('../dbserver');

router.get('/', (req, res) => {
    db.news({}, (news) => {
        res.render('news-list', {path: 'news', news});
    });
});

router.get('/:id', (req, res) => {
    const _id = db.ObjectId(req.params.id);
    db.newsOne({_id}, (news) => {
        res.render('news', {path: 'news', news});
    });
});

module.exports = router;