const app  = require('express')()
app.get('/',(req,res)=>{
    res.send("chao em")
})
app.listen(3000);