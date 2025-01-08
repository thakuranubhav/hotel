const mongoose= require('mongoose');
const MenuItemSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    taste:{
        type:String,
        enum:['sweet','salty','sour'],
        required:true
    },
    is_drink:{
        type:Boolean,
        default:false
    },
    ingredients:{
        type:[String],
        default:[]
    },
    noofsales:{
        type:Number,
        default:0
    }
    

})
const MenuItem= mongoose.model('MenuItems', MenuItemSchema);
module.exports=MenuItem;