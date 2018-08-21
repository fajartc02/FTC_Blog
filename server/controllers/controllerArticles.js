const Article = require('../models/modelArticle')

module.exports = {
  addArticle: (req, res) => {
    let newArticle = {
      title: req.body.title,
      author: req.body.author,
      description: req.body.description
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

  getAllArticle: (req, res) => {
    Article.find({})
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
          author: req.body.author || article.author,
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