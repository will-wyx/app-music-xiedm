const express = require('express');
const router = express.Router();
const db = require('../dbserver');

router.get('/business', (req, res) => {
    res.render('form-business');
});

router.post('/business', (req, res) => {
    const data = req.body;
    data.time = new Date();
    db.businessAdd(data, (r) => {
        console.log(r.result);
        res.render('form-business');
    });
});

router.get('/booking', (req, res) => {
    res.render('form-booking');
});

router.post('/booking', (req, res) => {
    const data = req.body;
    data.time = new Date();
    db.bookingAdd(data, (r) => {
        console.log(r.result);
        res.render('form-booking');
    })
});

router.get('/contact', (req, res) => {
    res.render('form-contact');
});

router.post('/contact', (req, res) => {
    const data = req.body;
    data.time = new Date();
    db.contactAdd(data, (r) => {
        console.log(r.result);
        res.render('form-contact');
    })
});

module.exports = router;
