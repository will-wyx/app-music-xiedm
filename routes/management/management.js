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

router.get('/artist', (req, res) => {
    const pagesize = 15;
    db.artistPaging({index: 1, pagesize}, (artists, count) => {
        const pagecount = Math.ceil(count/pagesize);
        res.render('management/artist', {path: req.url, artists, pagecount});
    });
});

router.get('/media', (req, res) => {
    const pagesize = 15;
    db.mediaPaging({index: 1, pagesize}, (medias, count) => {
        const pagecount = Math.ceil(count/pagesize);
        res.render('management/media', {path: req.url, medias, pagecount});
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

router.get('/artist/:id', (req, res) => {
    if (req.params.id !== 'add') {
        const _id = db.ObjectId(req.params.id);
        db.artistOne(_id, (artist) => {
            res.render('management/artist-edit', {path: '/artist', artist});
        });
    } else {
        res.render('management/artist-edit', {path: '/artist', artist: {}});
    }
});

router.get('/media/:id', (req, res) => {
    if (req.params.id !== 'add') {
        const _id = db.ObjectId(req.params.id);
        db.mediaOne(_id, (media) => {
            res.render('management/media-edit', {path: '/media', media});
        });
    } else {
        res.render('management/media-edit', {path: '/media', media: {}});
    }
});
router.get('/statistics', (req, res) => {
    res.render('management/lay', {path: req.url});
});
router.get('/layout/index', (req, res) => {
    db.home((home) => {
        home = home || {};
        home.slider = home.slider || [];
        home.banners = home.banners || [];
        res.render('management/layhome', {path: '/layout', home});
    });
});
router.get('/layout/:path', (req, res) => {
    const title = req.params.path;
    db.generic(title, (generic) => {
        generic = generic || {};
        generic.banners = generic.banners || [];
        res.render('management/laygeneric', {path: '/layout', generic});
    });
});
module.exports = router;