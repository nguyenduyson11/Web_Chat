
module.exports = function(model){
  return async (req,res,next)=>{
    const page = parseInt(req.query.page);
    const search = req.query.search;
    const limit = parseInt(process.env.LIMIT)
    const startIndex = (page-1) * limit;
    const endIndex = page * limit;
    const results = {}
    if (page){
      results.page = page;
    }
    if (endIndex < model.length){
      results.next = {
        page : page + 1,
        limit : limit
      }
    }
    if(startIndex > 0){
      results.previous = {
        page : page - 1,
        limit : limit
      }
    }
    if(search){
      results.results = await model.find(
        {
          $or:[
            {username:{$regex:search,$options:'i'}},
            {phone:{$regex:search,$options:'i'}}
          ]
        }
        )
      .limit(limit).skip(startIndex).exec();
    }
    else{
      results.results = await model.find().limit(limit).skip(startIndex).exec();
    }
  res.paginationResults = results;
  next();
  }
}