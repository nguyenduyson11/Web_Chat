const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const report = new Schema({
  type:String,
  id_post:mongoose.Types.ObjectId,
  title:{
    type:String,
    require:true
  },
  content:String
},{
  timestamps:true
});
module.exports  = mongoose.model('report',report);
