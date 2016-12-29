/**
 * Created by WILL on 2016/12/27.
 */
const express = require('express');
const router = express.Router();
const db = require('../../dbserver');

router.get('/', (req, res) => {
    res.render('management/index');
});
router.get('/login', (req, res) => {
    res.render('management/login');
});

router.get('/news', (req, res) => {
    db.newsPaging({index: 1, pagesize: 15}, (news) => {
        res.render('management/news', {path: req.url, news});
    });
});

router.get('/news/:id', (req, res) => {
    const _id = db.ObjectId(req.params.id);
    db.newsOne({_id}, (news) => {
        res.render('management/news-edit', {path: req.url, news});
    });
});

router.get('/artist', (req, res) => {
    res.render('management/artist', {path: req.url});
});
router.get('/media', (req, res) => {
    res.render('management/media', {path: req.url});
});
router.get('/statistics', (req, res) => {
    res.render('management/news', {path: req.url});
});
router.get('/layout/:path', (req, res) => {
    res.send(req.url);
});
module.exports = router;