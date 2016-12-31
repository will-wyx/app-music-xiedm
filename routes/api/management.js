/**
 * Created by WILL on 2016/12/29.
 */
const express = require('express');
const router = express.Router();
const db = require('../../dbserver');

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

router.post('/news-submit', (req, res) => {
    const id = req.body.id;
    if (id.length > 0)
        db.newsModify(req.body, (r) => {
            res.send('ok');
        });
    else
        db.newsAdd(req.body, () => {
            res.send('ok');
        });
});

router.post('/news', (req, res) => {
    db.newsAdd(req.body, (r) => {
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

module.exports = router;