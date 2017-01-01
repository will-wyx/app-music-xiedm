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
    const pagesize = 15;
    db.newsPaging({index: 1, pagesize}, (news, count) => {
        const pagecount = Math.ceil(count / pagesize);
        res.render('management/news', {path: req.url, news, pagecount});
    });
});

router.get('/news/:id', (req, res) => {
    if (req.params.id !== 'add') {
        const _id = db.ObjectId(req.params.id);
        db.newsOne({_id}, (news) => {
            res.render('management/news-edit', {path: req.url, news});
        });
    } else {
        res.render('management/news-edit', {path: req.url, news: {}});
    }
});

router.get('/artist', (req, res) => {
    const pagesize = 15;
    db.artistPaging({index: 1, pagesize}, (artists, count) => {
        const pagecount = Math.ceil(count/pagesize);
        res.render('management/artist', {path: req.url, artists, pagecount});
    });
});

router.get('/artist/:id', (req, res) => {
    // if (req.params.id !== 'add') {
    //     const _id = db.ObjectId(req.params.id);
    //     db.artistOne({_id}, (list) => {
    //         res.render('management/artist-edit', {path: req.url, list});
    //     });
    // } else {
        res.render('management/artist-edit', {path: '/artist', list: {}});
    // }
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