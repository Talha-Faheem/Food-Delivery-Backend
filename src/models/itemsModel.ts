import mongoose, { model } from "mongoose";

const itemsSchema=new mongoose.Schema({
    restaurant_id:{type:mongoose.Types.ObjectId,ref:'restaurants',required:true},
    category_id:{type:mongoose.Types.ObjectId,ref:'categories' ,required:true},
    name :{type:String,required:true},
    description:{type:String},
    cover:{type:String,required:true},
    price:{type:Number,required:true},
    status:{type:Boolean,reqired:true},
    created_at:{type:Date ,required:true,default:new Date()},
    updated_at:{type:Date ,required:true,default:new Date()}

})

export default model('Items',itemsSchema)