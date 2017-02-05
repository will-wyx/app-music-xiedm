/**
 * Created by WYX on 2017/1/9.
 */
const express = require('express');
const router = express.Router();
const db = require('../dbserver');

router.get('/', (req, res) => {
    const data = req.query;
    let options = {};
    if (data.query) {
        options.name = new RegExp(data.query);
    }
    if (data.letter) {
        switch (data.letter) {
            case 'all':
                options = {};
                break;
            default:
                options = {prefix: data.letter};
                break;
        }
    }
    db.search(options, (list) => {
        res.render('search', {data, list});
    });
});

module.exports = router;