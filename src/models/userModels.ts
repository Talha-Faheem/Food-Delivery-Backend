import mongoose, { model } from "mongoose";
const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  verfication_token: {
    type: String,
    required: true,
  },
  verfication_token_time: { type: Date, required: true },
  phone: { type: String, required: true },
    reset_password_token: {
    type: String,
   
  },
  reset_password_token_time: { type: Date,  },
  type: { type: String, required: true },
  status: { type: String, required: true },
  created_at: { type: String, required: true, default: new Date().toLocaleString('en-US',{
    timeZone:'Asia/Islambad'
  }) },
  updated_at: { type: String, required: true, default: new Date() },

});


export default model("user", userSchema);
