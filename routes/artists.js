const express = require('express');
const router = express.Router();
const db = require('../dbserver');

router.get('/', (req, res) => {
    db.artists((result) => {
        res.render('list', {path: 'artists', list: result});
    });
});

router.get('/:id', (req, res) => {
    // res.send('建设中...');
    const id = req.params.id;
    const bkurl = `/images/upload/${id}.jpg`;
    res.render('artist', {bkurl});
});

module.exports = router;
