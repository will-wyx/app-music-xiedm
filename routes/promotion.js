/**
 * Created by WYX on 2016/12/18.
 */
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('promotion', {path: 'promotion'});
});

module.exports = router;