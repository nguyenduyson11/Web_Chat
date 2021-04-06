const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const content = new Schema({
  id_user:{
    type:  mongoose.Types.ObjectId
  },
  content:{
    type:String
  },
  createAt:{
    type: Date, default: Date.now
  }
});
const message = new Schema({
  listMessage: [content]
},{
  timestamps:true
});
module.exports  = mongoose.model('message',message);
