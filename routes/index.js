const express = require('express');
const router = express.Router();
const db = require('../dbserver');
const tr = require('transliteration');

/* GET home page. */
router.get('/', home);

router.get('/home', home);

router.get('/abc', (req, res) => {
    const cn = req.query.str;
    res.json(tr.slugify(cn));
});

function home(req, res) {
    db.home((home) => {
        home = home || {};
        home.slider = home.slider || [];
        home.banners = home.banners || [];
        res.render('index', {path: 'home', home});
    });
}

module.exports = router;
