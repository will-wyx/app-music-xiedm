/**
 * Created by WILL on 2016/12/27.
 */
const express = require('express');
const router = express.Router();
const db = require('../../dbserver');

const multer = require('multer');
const mediaupload = multer({dest: "public/upload/medias"});


// router.all('/news', authNews);
// router.all('/news/*', authNews);
//
// function authNews(req, res, next) {
//     const role = req.cookies.auth && req.cookies.auth.role;
//     const flag = role && role.find((e) => e === 'admin' || e === 'news');
//
//     if (flag)
//         return next();
//     else
//     // next(new Error('Not authorized'));
//         res.send(401);
// }

router.get('/', (req, res) => {
    const role = (req.cookies.auth && req.cookies.auth.role) || {};
    res.render('management/index', {role});
});
router.get('/login', (req, res) => {
    res.render('management/login');
});

router.get('/news', (req, res) => {
    const role = (req.cookies.auth && req.cookies.auth.role) || {};
    const pagesize = 15;
    db.newsPaging({index: 1, pagesize}, (news, count) => {
        const pagecount = Math.ceil(count / pagesize);
        res.render('management/news', {path: req.url, news, pagecount, role});
    });
});

router.get('/artist', (req, res) => {
    const role = (req.cookies.auth && req.cookies.auth.role) || {};

    const pagesize = 15;
    db.artistPaging({index: 1, pagesize}, (artists, count) => {
        const pagecount = Math.ceil(count / pagesize);
        res.render('management/artist', {path: req.url, artists, pagecount, role});
    });
});

router.get('/media', (req, res) => {
    const role = (req.cookies.auth && req.cookies.auth.role) || {};

    const pagesize = 15;
    db.mediaPaging({index: 1, pagesize}, (medias, count) => {
        const pagecount = Math.ceil(count / pagesize);
        res.render('management/media', {path: req.url, medias, pagecount, role});
    });
});

router.get('/news/:id', (req, res) => {
    const role = (req.cookies.auth && req.cookies.auth.role) || {};

    if (req.params.id !== 'add') {
        const _id = db.ObjectId(req.params.id);
        db.newsOne({_id}, (news) => {
            res.render('management/news-edit', {path: req.url, news, role});
        });
    } else {
        res.render('management/news-edit', {path: req.url, news: {}, role});
    }
});

router.get('/artist/:id', (req, res) => {
    const role = (req.cookies.auth && req.cookies.auth.role) || {};

    if (req.params.id !== 'add') {
        const _id = db.ObjectId(req.params.id);
        db.artistOne(_id, (artist) => {
            res.render('management/artist-edit', {path: '/artist', artist, role});
        });
    } else {
        res.render('management/artist-edit', {path: '/artist', artist: {}, role});
    }
});

router.get('/media/:id', (req, res) => {
    const role = (req.cookies.auth && req.cookies.auth.role) || {};

    if (req.params.id !== 'add') {
        const _id = db.ObjectId(req.params.id);
        db.mediaOne(_id, (media) => {
            res.render('management/media-edit', {path: '/media', media, role});
        });
    } else {
        res.render('management/media-edit', {path: '/media', media: {}, role});
    }
});
router.get('/statistics', (req, res) => {
    const role = (req.cookies.auth && req.cookies.auth.role) || {};

    res.render('management/lay', {path: req.url, role});
});
router.get('/layout/index', (req, res) => {
    const role = (req.cookies.auth && req.cookies.auth.role) || {};

    db.home((home) => {
        home = home || {};
        home.slider = home.slider || [];
        home.banners = home.banners || [];
        res.render('management/layhome', {path: '/layout', home, role});
    });
});
router.get('/layout/:path', (req, res) => {
    const role = (req.cookies.auth && req.cookies.auth.role) || {};

    const title = req.params.path;
    db.generic(title, (generic) => {
        generic = generic || {};
        generic.banners = generic.banners || [];
        res.render('management/laygeneric', {path: '/layout', generic, role});
    });
});


router.post('/media-upload', mediaupload.single('file'), (req, res) => {
    req.body.path = req.file.path.substr(6);
    db.mediaAdd(req.body, (r) => {
        res.location('/management/media');
    });
});
module.exports = router;