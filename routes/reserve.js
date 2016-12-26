/**
 * Created by WYX on 2016/12/26.
 */
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    // res.render('reserve', {path: 'reserve'});
    res.send('建设中...');
});

module.exports = router;