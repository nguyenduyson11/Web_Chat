const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const comment = new Schema({
  author: mongoose.Types.ObjectId,
  content:{
    type: String,
    require: true
  },
  images:String,
  likes:[mongoose.Types.ObjectId],
  hearts:[mongoose.Types.ObjectId],
  subComment:[mongoose.Types.ObjectId]
},{
  timestamps: true
})

module.exports  = mongoose.model('Comment',comment);
