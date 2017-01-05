const express = require('express');
const router = express.Router();
const db = require('../dbserver');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {path: 'home'});
});

router.get('/home', (req, res) => {
    db.home((home) => {
        home.slider = home.slider || [];
        home.banners = home.banners || [];
        res.render('index', {path: 'home', home});
    });
});

module.exports = router;
