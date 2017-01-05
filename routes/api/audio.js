/**
 * Created by WYX on 2017/1/5.
 */
const express = require('express');
const router = express.Router();
const db = require('../../dbserver');

router.get('/:id', (req, res) => {
    const _id = db.ObjectId(req.params.id);
    db.audioOne(_id, (audio) => {
        res.json(audio);
    });
});

module.exports = router;