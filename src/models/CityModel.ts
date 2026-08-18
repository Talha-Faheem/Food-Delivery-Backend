import mongoose, { model } from "mongoose";

const citySchema=new mongoose.Schema({
    name:{type:String,required:true},
    status:{type:String,required:true},
    lat:{type:Number ,required :true},
    lng:{type:Number ,required:true},
    created_at:{type:String,required:true},
    updated_at:{type:String,required:true},
})

export default model('cities', citySchema)