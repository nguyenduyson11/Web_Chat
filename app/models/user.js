const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema({
    username:{
        type:String,
        required:true,
        minlength:6
    },
    male:{
        type:String,
        required: true
    },
    date_of_bitrh:{
        type:Date,
        default:Date.Now
    },
    email:{
        type:String,
        require:true,
        minlength:6
    },
    phone:{
        type:String,
        require:true,
        maxlength:12
    },
    city:{
        type:String,
        default:"Đà Nẵng"
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    activated:{
        type:Boolean,
        default:false
    },
    admin:{
        type:Boolean,
        default:false
    },
    friends:{
        type:Object,
    },
    image:{
        type:String,
        default:'https://loremflickr.com/50/50'
    }
},{
    timestamps:true
});
module.exports  = mongoose.model('User',user);
