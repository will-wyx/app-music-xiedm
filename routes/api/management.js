/**
 * Created by WILL on 2016/12/29.
 */
const express = require('express');
const router = express.Router();
const db = require('../../dbserver');



const multer = require('multer');
const layoutupload = multer({dest:"public/upload/layout"});

router.get('/news', (req, res) => {
    const {index, pagesize} = req.query;
    db.newsPaging({index: +index, pagesize: +pagesize}, (news) => {
        res.json(news);
    });
});

router.get('/artist', (req, res) => {
    const {index, pagesize} = req.query;
    db.artistPaging({index: +index, pagesize: +pagesize}, (artists) => {
        res.json(artists);
    });
});

router.post('/news', (req, res) => {
    db.newsAdd(req.body, (r) => {
        res.send('ok');
    });
});
router.post('/artist', (req, res) => {
    db.artistAdd(req.body, (r) => {
        res.send('ok');
    });
});
router.put('/news', (req, res) => {
    db.newsModify(req.body, (r) => {
        res.send('ok');
    });
});
router.delete('/news', (req, res) => {
    db.newsDelete(req.body.id, (r) => {
        res.send(r);
    });
});
router.delete('/artist', (req, res) => {
    db.artistDelete(req.body.id, (r) => {
        res.send(r);
    });
});



router.post('/layout-upload', layoutupload.single('file'), (req, res) => {
    req.body.path = req.file.path.substr(6);
    res.json({path: req.body.path});
});

module.exports = router;