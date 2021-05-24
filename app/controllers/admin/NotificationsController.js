const User = require('../../models/user');
const Post = require('../../models/post');
const Report = require('../../models/report');
const moment = require('moment');
class NotificationsController{
  async index(req,res){
    let listReport = await Report.find({}).sort({createAt: -1}).lean();
    let reports =  res.paginationResults.results;
    listReport = listReport.map(function(data){
      data.dateCreate = moment(data.createdAt).format('DD/MM/YYYY');
      return data;
    })
    let warning = req.flash('warning');
    res.render('admin/viewNotification',{
      warning,
      listReport
    });
  }
}

module.exports = new NotificationsController;