const mainRouter = require('./mainRouter');
const adminRouter = require('./adminRouter');
const clientRouter = require('./clientRouter');
const check_admin = require('../helpers/check_admin');
const listFriend = require('../app/middlewares/listFriends');
const check_login = require('../helpers/check_Login');
const currentUser = require('../helpers/currentUser_helper');
function router(app){
    app.use('/admin', check_admin, adminRouter);
    app.use('/', mainRouter);
    app.use('/', check_login,currentUser.setCurrentUser,listFriend, clientRouter);
}
module.exports =  router;
