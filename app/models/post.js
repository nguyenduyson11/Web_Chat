const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const post = new Schema({
  id_user:{
    type: mongoose.Types.ObjectId,
    require: true
  },
  content:{
    type: String,
    require: true
  },
  images:[],
  public:{
    type: Boolean,
    default: true
  },
  likes:{
    type:Number,
    default: 0
  },
  hearts:{
    type:Number,
    default: 0
  },
  deleted:{
    type: Boolean,
    default: false
  },
  comment:[mongoose.Types.ObjectId]
},{
  timestamps: true
})

module.exports  = mongoose.model('Post',post);