var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {path: 'home'});
});

router.get('/home', (req, res) => {
    res.render('index', {path: 'home'});
});

module.exports = router;
