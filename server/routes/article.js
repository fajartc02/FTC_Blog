var express = require('express');
var router = express.Router();
const {addArticle, getAllArticle, removeArticle, editArticle} = require('../controllers/controllerArticles')

router.post('/', addArticle)
router.get('/', getAllArticle)
router.put('/edit/:id', editArticle)
router.delete('/delete/:id', removeArticle)
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


module.exports = router;