var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', (req, res) => {
  res.render('list', {path: 'artists'});
});

module.exports = router;
