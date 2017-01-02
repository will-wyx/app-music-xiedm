const express = require('express');
const router = express.Router();
const db = require('../dbserver');

router.get('/', (req, res) => {
    db.artist((result) => {
        res.render('list', {path: 'artists', list: result});
    });
});

router.get('/:id', (req, res) => {
    const _id = db.ObjectId(req.params.id);
    db.artistOne(_id, (artist) => {
        res.render('artist', {path: 'artists', artist});
    });
});

module.exports = router;
