let mongoose=require('mongoose');
let Schema=mongoose.Schema;
let citySchema=new Schema({
    code:String,
    name:String,
    province:String,
    city:String,
    county:String,
    level:Number
});
module.exports=mongoose.model('cities',citySchema);
