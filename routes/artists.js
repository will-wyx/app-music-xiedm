const express = require('express');
const router = express.Router();
const db = require('../dbserver');

router.get('/', (req, res) => {
    db.artist((result) => {
        res.render('list', {path: 'artists', list: result});
    });
});

router.get('/:id', (req, res) => {
    // res.send('建设中...');
    const id = req.params.id;
    db.artistOne(id, (artist) => {
        console.log(artist);
        res.render('artist', {path: 'artists', artist});
    });
});

module.exports = router;
