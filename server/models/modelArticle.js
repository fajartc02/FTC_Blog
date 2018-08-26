const mongoose = require('mongoose')
const Schema = mongoose.Schema

const articleSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  UserId: {type: Schema.Types.ObjectId, ref: 'User'},
  comments: [
    {
      name: String,
      comment: String,
      date: Date
    }
  ],
  img: {type: String}
}, {
  timestamps: true
})

const Article = mongoose.model('Article', articleSchema)
module.exports = Article