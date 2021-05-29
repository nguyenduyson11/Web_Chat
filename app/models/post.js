const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const post = new Schema({
  author:Object,
  content:{
    type: String,
    require: true
  },
  images:[],
  public:{
    type: Boolean,
    default: true
  },
  link:{
    type:String,
    default: null,
  },
  likes:[mongoose.Types.ObjectId],
  hearts:[mongoose.Types.ObjectId],
  shared:[mongoose.Types.ObjectId],
  deleted:{
    type: Boolean,
    default: false
  },
  comment:[mongoose.Types.ObjectId]
},{
  timestamps: true
})

module.exports  = mongoose.model('Post',post);