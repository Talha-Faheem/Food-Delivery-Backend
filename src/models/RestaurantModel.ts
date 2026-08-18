import mongoose, { model } from "mongoose";

const restaurantSchema = new mongoose.Schema({
    user_id: { type: mongoose.Types.ObjectId, ref:'users',required: true },
    city_id: { type: mongoose.Types.ObjectId,ref:'cities', required: true },
    name: { type: String, required: true },
    // short_name: { type: String, required: true },
    description: { type: String, required: true },
    cover: { type: String, required:true},
    location: { type: Object, required: true },
    cuisians:{type:Array,required:true},
    openTime: { type: String, required: true },
    closeTime: { type: String, required: true },
    price: { type: Number, required: true },
    address: { type: String, required: true },
    deliveryTime: { type: Number, required: true },
    isClose: { type: Boolean, required: true, default: false },
    status: { type: String, required: true, default: "pending" },
    rating: { type: Number, required: true, default: 0 },
    totalRating: { type: Number, required: true, default: 0 },
    created_at: { type: Date, required: true, default: new Date() },
    updated_at: { type: Date, required: true, default: new Date() }
});

export default model("restaurants", restaurantSchema);