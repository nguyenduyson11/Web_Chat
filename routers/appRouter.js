const mainRouter = require('./mainRouter')

function router(app){
    app.use('/', mainRouter);
}

module.exports =  router;
