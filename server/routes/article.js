var express = require('express');
var router = express.Router();
const { addArticle, myArticles, removeArticle, editArticle, getOneArticle, getAllArticle, addComment, deleteComment } = require('../controllers/controllerArticles')
const { auth } = require('../middleware/auth')
const images = require('../helpers/images')

router.put('/edit/:id', auth, editArticle)
router.delete('/delete/:id', auth, removeArticle)
router.get('/getAll', getAllArticle)
router.get('/get/:id', auth, getOneArticle)
router.put('/comment/delete/:id',auth, deleteComment)
router.put('/comment/:id',auth, addComment)
router.post('/',auth, addArticle)
router.get('/',auth ,myArticles)
/* GET users listing. */

/* GET main endpoint. */
router.get('/', (req, res, next) => {
  res.send({ message: 'Welcome Buddy!' })
})
router.post('/upload', auth,
  images.multer.single('image'), 
  images.sendUploadToGCS,
  (req, res) => {
    res.send({
      status: 200,
      message: 'Your file is successfully uploaded',
      link: req.file.cloudStoragePublicUrl
    })
  })


module.exports = router;