/**
 * Created by WYX on 2016/12/17.
 */
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('about', {path: 'contact'});
});

module.exports = router;