const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', (req, res) => {
    res.render('list', {path: 'artists'});
});

router.get('/:id', (req, res) => {
    res.render('artist', {id: req.params.id});
});

module.exports = router;
