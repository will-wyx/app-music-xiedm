const express = require('express');
const router = express.Router();
const db = require('../dbserver');

/* GET home page. */
router.get('/', home);

router.get('/home', home);

function home(req, res) {
    db.home((home) => {
        home = home || {};
        home.slider = home.slider || [];
        home.banners = home.banners || [];
        res.render('index', {path: 'home', home});
    });
}

module.exports = router;
