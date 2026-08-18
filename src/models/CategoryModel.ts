import mongoose, { model } from "mongoose";

const catergorySchema= new mongoose.Schema({
    user_id:{type:mongoose.Types.ObjectId,ref:'restaurants',required:true},
    name:{type:String,required:true},
    status:{type:Boolean,default:true},
    created_at:{type:Date,required:true,default:new Date()},
    update_at:{type:Date,required:true,default:new Date()},
    // cuisine:{type:mongoose.Types.ObjectId},
})

export default model('categories',catergorySchema)