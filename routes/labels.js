/**
 * Created by WYX on 2016/12/18.
 */
var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    res.render('list', {path: 'labels'});
});

module.exports = router;
