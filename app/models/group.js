const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const group = new Schema({
  author: mongoose.Types.ObjectId,
  title: {
    type: String,
    require: true
  },
  coverImage:{
    type: String,
    default: '/images/groupImage.jpg'
  },
  posts: [],
  requests: [],
  members: []
},{
  timestamps: true
})

module.exports  = mongoose.model('Group',group);
