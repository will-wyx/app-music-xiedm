const express = require('express');
const router = express.Router();
const db = require('../dbserver');

router.get('/business', (req, res) => {
    res.render('form-business');
});

router.get('/booking', (req, res) => {
    res.render('form-booking');
});

router.get('/contact', (req, res) => {
    res.render('form-contact');
});

module.exports = router;
