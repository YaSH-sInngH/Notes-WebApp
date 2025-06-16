import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    otp:{
        type:String,
    },
    otpExpiry:{
        type:Date,
    }
})

const User = mongoose.model('user',userSchema)
export default User;