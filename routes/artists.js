const express = require('express');
const router = express.Router();
const db = require('../dbserver');

router.get('/', (req, res) => {
    db.artist((result) => {
        res.render('artists', {path: 'artists', list: result});
    });
});

router.get('/play', (req, res) => {
    const src = req.query.src;
    res.render('play', {src});
});

router.get('/:id', (req, res) => {
    const _id = db.ObjectId(req.params.id);
    db.artistOne(_id, (artist) => {
        artist.infos = artist.infos || [];
        artist.audios = artist.audios || [];
        artist.videos = artist.videos || [];
        artist.schedule = artist.schedule || [];
        artist.albums = artist.albums || [];
        res.render('artist', {path: 'artists', artist});
    });
});

module.exports = router;
