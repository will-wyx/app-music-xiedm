const express = require('express');
const router = express.Router();
const db = require('../dbserver');

router.get('/', (req, res) => {
    db.label((result) => {
        res.render('labels', {path: 'labels', list: result});
    });
});

router.get('/:id', (req, res) => {
    const _id = db.ObjectId(req.params.id);
    db.labelOne(_id, (artist) => {
        artist.infos = artist.infos || [];
        artist.audios = artist.audios || [];
        artist.videos = artist.videos || [];
        artist.schedule = artist.schedule || [];
        artist.albums = artist.albums || [];
        res.render('label', {path: 'labels', artist});
    });
});

module.exports = router;
