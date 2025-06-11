import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

dotenv.config();

export const register = async (req, res)=>{
    const {email, password, confirmPassword} = req.body;
    if (!email || !password || !confirmPassword) {
        return res.status(400).json({ message: "All fields are required" });
    }
    if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
    }
    try{
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message: "User already exists"});
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            email,
            password: hashedPassword
        });
        await newUser.save();
        
        res.status(201).json({ message: "User registered" });
    }catch(error){
        res.status(500).json({ message: "Error while registering the user" });
    }
}

export const login = async (req, res)=>{
    const {email, password} = req.body;
    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message: "User does not exist"});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message: "Invalid credentials"});
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'});
        res.json({token});
    }catch(error){
        res.status(500).json({ message: "Error while logging in" });
    }
}

// export const forgotPassword = async (req, res) => {
//     const { email } = req.body;

//     if(!email) {
//         return res.status(400).json({ message: "Email is required" });
//     }

//     try {
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(400).json({ message: "User does not exist" });
//         }

//         const token = crypto.randomBytes(32).toString("hex");
//         user.resetPasswordToken = token;
//         user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
//         await user.save();

//         const transporter = nodemailer.createTransport({
//             service: 'gmail',
//             auth: {
//                 user: process.env.EMAIL,
//                 pass: process.env.EMAIL_PASSWORD
//             }
//         });

//         await transporter.sendMail({
//             to: user.email,
//             subject: "Password Reset",
//             html: `<p>You requested a password reset</p>
//                    <p>Click this <a href="${process.env.CLIENT_URL}/reset-password/${token}">link</a> to reset your password</p>`
//         });
//         res.json({ message: "Password reset link sent to your email" });

//     } catch (error) { 
//         console.error(error);
//         res.status(500).json({ message: "Error while sending password reset email" });
//     }
// }

// export const resetPassword = async (req, res) => {
//     const { token, newPassword } = req.body;

//     if (!token || !newPassword) {
//         return res.status(400).json({ message: "Token and new password are required" });
//     }

//     try {
//         const user = await User.findOne({
//             resetPasswordToken: token,
//             resetPasswordExpires: { $gt: Date.now() }
//         });

//         if (!user) {
//             return res.status(400).json({ message: "Invalid or expired token" });
//         }

//         user.password = await bcrypt.hash(newPassword, 10);
//         user.resetPasswordToken = undefined;
//         user.resetPasswordExpires = undefined;
//         await user.save();

//         res.json({ message: "Password has been reset successfully" });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Error while resetting password" });
//     }
// }