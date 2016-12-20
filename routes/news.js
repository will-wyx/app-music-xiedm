/**
 * Created by WILL on 2016/12/20.
 */
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('news-list');
});

router.get('/:id', (req, res) => {
    res.render('news', {id: req.params.id});
});

module.exports = router;