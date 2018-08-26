var express = require('express');
var router = express.Router();
const { getProfileUser } = require('../controllers/controllerUsers')

router.get('/', getProfileUser)
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });


module.exports = router;