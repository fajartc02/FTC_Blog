const Article = require('../models/modelArticle')
const jwt = require('jsonwebtoken')

module.exports = {
  getAllArticle: (req, res) => {
    Article.find({})
    .populate('UserId')
    .then(articles => {
      res.status(200).json({
        message: 'SUccess',
        data: articles
      })
    })
    .catch(err => {
      res.status(500).json({
        message: 'Fail',
        err: err.message
      })
    })
  },

  addArticle: (req, res) => {
    let token = req.headers.token
    let decode = jwt.verify(token, process.env.JWT_KEY)
    let newArticle = {
      title: req.body.title,
      description: req.body.description,
      UserId: decode.id,
      img: req.body.image
    }
    Article.create(newArticle)
      .then(article => {
        res.status(201).json({
          message: 'Success create user',
          data: article
        })
      })
      .catch(err => {
        res.status(500).json({
          message: 'Failed create user'
        })
      })
  },

  addComment: (req, res) => {
    let id = {
      _id: req.params.id
    }
    let decode = jwt.verify(req.headers.token, process.env.JWT_KEY)
    let commentUser = {
      name: decode.name,
      comment: req.body.comment,
      date: new Date()
    }
    Article.update(id, { $push: { comments: commentUser } })
    .then((result) => {
      res.status(201).json({
        message: 'Success to comment',
        data: result
      })
    })
    .catch((err) => {
      res.status(500).json({
        message: 'Failed',
        err: err.message
      })
    });
  },

  deleteComment: (req, res) => {
    let idPost = {
      _id: req.params.id
    }
    Article.update(idPost, {
      $pull: {
        comments: { _id: req.body.idComment }
      }
    })
    .then(data => {
      res.status(201).json({
        message: 'Success delete comment',
        data: data
      })
    })
    .catch(err => {
      res.status(400).json({
        message: 'failed',
        err: err.message
      })
    })
  },

  getOneArticle: (req, res) =>  {
    let decode = jwt.verify(req.headers.token, process.env.JWT_KEY)
    let idArticle = {
      _id: req.params.id
    }
    Article.findOne(idArticle)
    .populate('UserId')
    .then(article => {
      res.status(201).json({
        message: 'Success get article',
        data: article
      })
      
    })
    .catch(err => {
      res.status(500).json({
        message: 'Fail',
        err: err.message
      })
    })
  },

  myArticles: (req, res) => {
    let decode = jwt.verify(req.headers.token, process.env.JWT_KEY)
    let idUser = {
      UserId: decode.id
    }
    Article.find(idUser)
      .then(articles => {
        res.status(200).json({
          message: 'Success get articles',
          data: articles
        })
      })
      .catch(err => {
        res.status(500).json({
          message: 'Failed get article',
          err: err.message
        })
      })
  },

  editArticle: (req, res) => {
    let id = {
      _id: req.params.id
    }
    Article.findOne(id)
    .then((article) => {
        let updatedArticle = {
          title: req.body.title || article.title,
          description: req.body.description || article.description
        }
        Article.update(id, {$set: updatedArticle})
        .then((result) => {
          res.status(201).json({
            message: 'Success to update',
            data: result
          })  
        })
        .catch((err) => {
          res.status(500).json({
            message: 'failed to update',
            err: err.message
          })
        });
    })
    .catch((err) => {
      res.status(500).json({
        message: 'Failed cannot found',
        err: err.message
      })
    });
  },

  removeArticle: (req, res) => {
    let id = {
      _id: req.params.id
    }
    Article.remove(id)
    .then(() => {
      res.status(201).json({
        message: 'Success to delete article',
      })
    }).catch((err) => {
      res.status(500).json({
        message: 'Failed to delete article'
      })
    });
  }
}