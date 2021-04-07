const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const comment = new Schema({
  id_user:{
    type: mongoose.Types.ObjectId,
    require: true
  },
  content:{
    type: String,
    require: true
  },
  images:[],
  likes:{
    type:Number,
    default: 0
  },
  hearts:{
    type:Number,
    default: 0
  },
  subComment:[mongoose.Types.ObjectId]
},{
  timestamps: true
})

module.exports  = mongoose.model('Comment',comment);
