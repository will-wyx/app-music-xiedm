/**
 * Created by WILL on 2016/12/27.
 */
const express = require('express');
const router = express.Router();
router.get('/', (req, res) => {
    res.render('management/index');
});
router.get('/login', (req, res) => {
    res.render('management/login');
});
module.exports = router;