 
 const User = require('../../models/user');
 const multer = require('multer');
const mongoose  = require('mongoose');
 var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/upload');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+'-'+ file.originalname );
  }
})
var upload = multer({ 
  storage: storage,
  fileFilter: function (req, file, cb) {
      if(file.mimetype=="image/bmp" || file.mimetype=="image/png" || file.mimetype=="image/jpg" || file.mimetype=="image/jpeg" || file.mimetype=="image/gif"){
          cb(null, true);  
      }else{
          return cb(new Error('Only image are allowed!'))
      }
  }
}).single("image");
class MessagesController{
  async index(req,res){
    let listUser = await User.find({});
    let listId = req.user.friends;
    let listFriends =  listId.map(function(data){
      let isExist = listUser.find(e=>e._id.toString() == data.toString())
      if(isExist){
        return isExist;
      }
    })
    
    res.render('clients/chat',{
      listFriends,
      user:req.user
    });
  }
  create(req,res){
    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        res.json({
          status: 'no',
          err: 'Không thể tải được file'
        })
        return;
      } else if (err) {
        res.json({
          status: 'no',
          err: err
        })
        return;
      }
      // console.log(req.body)
      // if(req.file){
      //   console.log(req.file.filename)
      // }
      var me = req.user;
      User.findById(req.params.id,function(err,data){
        if(err){
         return res.json({status:'error',message:'không tìm thấy user'})
        }
        User.updateOne({
          $and: [{
            "_id": data._id
          },{
            "messages.toUser": me._id
          }]
        },{
          $push: {
            "messages.$.inbox" : {
              "_id": mongoose.Types.ObjectId(),
              "from": me._id,
              "message": req.body.message,
              "icon": req.body.icon,
               "file": (req.file) ? req.file.filename : null,
               "createAt": req.body.createAt
            }
          }
        },function(err,data){
          if(err){
            return res.json({status:'error'})
          }
          User.updateOne({
            $and: [{
              "_id": mongoose.Types.ObjectId(req.user._id)
            },{
              "messages.toUser": mongoose.Types.ObjectId(req.params.id)
            }]
          },{
            $push: {
              "messages.$.inbox" : {
                "_id": mongoose.Types.ObjectId(),
                "from": me._id,
                "message": req.body.message,
                "icon": req.body.icon,
                 "file": (req.file) ? req.file.filename : null,
                 "createAt": req.body.createAt
              }
            }
          },function(err,data){
            if(err){
              return res.json({status:'error'})
            }
            res.json({status:'oke',inbox:{
               from: me._id,
               message: req.body.message,
               icon: (req.body.icon == '' ? null : req.body.icon),
               file: (req.file) ? req.file.filename : null,
               createAt: req.body.createAt
            }})
          })
        })
      })
    })
  }
}
module.exports = new MessagesController;