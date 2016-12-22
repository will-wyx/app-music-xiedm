const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', (req, res) => {
    res.render('list', {path: 'artists'});
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    const bkurl = `/images/upload/${id}.jpg`;
    res.render('artist', {bkurl});
});

module.exports = router;
