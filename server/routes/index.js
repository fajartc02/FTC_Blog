var express = require('express');
var router = express.Router();
const article = require('./article')
const {signin, signup} = require('../controllers/controllerUsers')


router.post('/signin', signin)
router.post('/signup', signup)
router.use('/article', article)
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
