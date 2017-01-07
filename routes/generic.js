/**
 * Created by WYX on 2017/1/5.
 */
const express = require('express');
const router = express.Router();
const db = require('../dbserver');

router.get('/', (req, res) => {
    const title = req.baseUrl.substring(1);
    db.generic(title, (generic) => {
        generic = generic || {};
        generic.banners = generic.banners || [];
        res.render('generic', {path: title, generic});
    });
    // res.send(req.baseUrl);
});

module.exports = router;