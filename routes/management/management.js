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
router.all('/*', (req, res, next) => {
    const role = req.cookies.auth && req.cookies.auth.role;
    if (role) {
        req.locals = req.locals || {};
        req.locals.role = role;
        next();
    } else {
        res.render('management/login');
    }
});

router.get('/', (req, res) => {
    res.redirect('/management/login');
});

router.get('/home', (req, res) => {
    res.render('management/index', {role: req.locals.role});
});

router.get('/login', (req, res) => {
    res.render('management/login');
});

router.get('/news', (req, res) => {
    const pagesize = 15;
    db.newsPaging({index: 1, pagesize}, (news, count) => {
        const pagecount = Math.ceil(count / pagesize);
        res.render('management/news', {path: req.url, news, pagecount, role: req.locals.role});
    });
});

router.get('/label', (req, res) => {
    const pagesize = 15;
    db.labelPaging({index: 1, pagesize}, (artists, count) => {
        const pagecount = Math.ceil(count / pagesize);
        res.render('management/label', {path: req.url, artists, pagecount, role: req.locals.role});
    });
});

router.get('/artist', (req, res) => {
    const pagesize = 15;
    db.artistPaging({index: 1, pagesize}, (artists, count) => {
        const pagecount = Math.ceil(count / pagesize);
        res.render('management/artist', {path: req.url, artists, pagecount, role: req.locals.role});
    });
});

router.get('/media', (req, res) => {
    const pagesize = 15;
    db.mediaPaging({index: 1, pagesize}, (medias, count) => {
        const pagecount = Math.ceil(count / pagesize);
        res.render('management/media', {path: req.url, medias, pagecount, role: req.locals.role});
    });
});

router.get('/album', (req, res) => {
    const pagesize = 15;
    db.albumPaging({index: 1, pagesize}, (albums, count) => {
        const pagecount = Math.ceil(count / pagesize);
        res.render('management/album', {path: req.url, albums, pagecount, role: req.locals.role});
    });
});

router.get('/news/add', (req, res) => {
    res.render('management/news-edit', {path: req.url, news: {}, role: req.locals.role});
});

router.get('/news/:id', (req, res) => {
    const _id = db.ObjectId(req.params.id);
    db.newsOne({_id}, (news) => {
        res.render('management/news-edit', {path: req.url, news, role: req.locals.role});
    });
});

router.get('/artist/add', (req, res) => {
    const artist = {
        infos: [],
        audios: [],
        videos: [],
        schedule: [],
        albums: []
    };
    res.render('management/artist-edit', {path: '/artist', artist, role: req.locals.role});
});

router.get('/label/add', (req, res) => {
    const artist = {
        infos: [],
        audios: [],
        videos: [],
        schedule: [],
        albums: []
    };
    res.render('management/artist-edit', {path: '/label', artist, role: req.locals.role});
});

router.get('/artist/:id', (req, res) => {
    const _id = db.ObjectId(req.params.id);
    db.artistOne(_id, (artist) => {
        artist.infos = artist.infos || [];
        artist.audios = artist.audios || [];
        artist.videos = artist.videos || [];
        artist.schedule = artist.schedule || [];
        artist.albums = artist.albums || [];
        res.render('management/artist-edit', {path: '/artist', artist, role: req.locals.role});
    });
});

router.get('/label/:id', (req, res) => {
    const _id = db.ObjectId(req.params.id);
    db.artistOne(_id, (artist) => {
        artist.infos = artist.infos || [];
        artist.audios = artist.audios || [];
        artist.videos = artist.videos || [];
        artist.schedule = artist.schedule || [];
        artist.albums = artist.albums || [];
        res.render('management/artist-edit', {path: '/label', artist, role: req.locals.role});
    });
});

router.get('/media/add', (req, res) => {
    const media = {
        album: {}
    };
    res.render('management/media-edit', {path: '/media', media, role: req.locals.role});
});

router.get('/media/:id', (req, res) => {
    const _id = db.ObjectId(req.params.id);
    db.mediaOne(_id, (media) => {
        // 查询专辑
        const album_id = media.album;
        db.albumOne(album_id, (album) => {
            media.album = album || {};
            res.render('management/media-edit', {path: '/media', media, role: req.locals.role});
        });
    });
});

router.get('/album/add', (req, res) => {
    res.render('management/album-edit', {album: {}, role: req.locals.role});
});

router.get('/album/:id', (req, res) => {
    const _id = db.ObjectId(req.params.id);
    db.albumOne(_id, (album) => {
        res.render('management/album-edit', {path: '/album', album, role: req.locals.role});
    });
});

router.get('/statistics', (req, res) => {
    res.render('management/lay', {path: req.url, role: req.locals.role});
});
router.get('/layout/index', (req, res) => {
    db.home((home) => {
        home = home || {};
        home.slider = home.slider || [];
        home.banners = home.banners || [];
        res.render('management/layhome', {path: '/layout', home, role: req.locals.role});
    });
});
router.get('/layout/:path', (req, res) => {
    const title = req.params.path;
    db.generic(title, (generic) => {
        generic = generic || {};
        generic.banners = generic.banners || [];
        res.render('management/laygeneric', {path: '/layout', generic, role: req.locals.role});
    });
});

router.post('/media-upload', mediaupload.single('file'), (req, res) => {
    req.body.path = req.file.path.substr(6);
    db.mediaAdd(req.body, (r) => {
        res.redirect('/management/media');
    });
});

router.get('/logout', (req, res) => {
    res.clearCookie('auth');
    res.render('management/login')
});
module.exports = router;