const mongoose=require("mongoose");

const Prodchema=mongoose.Schema({
    title : String,
    price:String,
    product:String,
    material:String,
    shape:String,
    length:String,
    thickness:String,
    surface:String,
    outdia:String
});

const Prodmodel=mongoose.model("todo",Prodchema);

module.exports={Prodmodel};