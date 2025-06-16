import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

dotenv.config();

export const register = async (req, res) => {
    const {email, password, confirmPassword} = req.body;
    if (!email || !password || !confirmPassword) {
        return res.status(400).json({ message: "All fields are required" });
    }
    if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
    }
    try {
        const existingUser = await User.findOne({email});
        if(existingUser) {
            return res.status(400).json({message: "User already exists"});
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            email,
            password: hashedPassword
        });
        await newUser.save();
        
        res.status(201).json({ message: "User registered" });
    } catch(error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: "Error while registering the user" });
    }
}

export const login = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({message: "User does not exist"});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({message: "Invalid credentials"});
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'});
        res.json({token});
    } catch(error) {
        console.error('Login error:', error);
        res.status(500).json({ message: "Error while logging in" });
    }
}

export const sendOTP = async (req, res) => {
    const {email} = req.body;
    
    if(!email) {
        return res.status(400).json({ message: "Email is required" });
    }
    
    try {
        // Check if user exists
        const user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({ message: "User not found." });
        }   
        
        // Generate OTP
        const otp = Math.floor(1000 + Math.random() * 9000).toString();
        const otpExpiry = Date.now() + 5 * 60 * 1000; // 5 minutes expiry
        
        // Save OTP to user
        user.otp = otp;
        user.otpExpiry = otpExpiry;
        await user.save();

        // Verify environment variables
        if (!process.env.EMAIL || !process.env.EMAIL_PASSWORD) {
            console.error('Email credentials not found in environment variables');
            return res.status(500).json({ message: "Server configuration error" });
        }

        console.log('Attempting to send email with:', {
            email: process.env.EMAIL,
            to: email,
            otp: otp
        });

        // Create transporter with explicit configuration
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        // Verify transporter configuration
        await transporter.verify();
        console.log('Email transporter verified successfully');

        const mail_configs = {
            from: process.env.EMAIL,
            to: email,
            subject: "Notes Web App - Your OTP Code",
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #333;">Password Reset OTP</h2>
                    <p>Your OTP for password reset is:</p>
                    <h1 style="color: #00466a; background-color: #f0f0f0; padding: 20px; text-align: center; border-radius: 5px;">${otp}</h1>
                    <p style="color: #666;">This OTP is valid for 5 minutes only.</p>
                    <p style="color: #666;">If you didn't request this, please ignore this email.</p>
                </div>
            `
        };

        await transporter.sendMail(mail_configs);
        console.log('OTP email sent successfully to:', email);

        res.json({message: "OTP sent to your email"});
        
    } catch(error) {
        console.error('SendOTP error:', error);
        
        // Provide more specific error messages
        if (error.code === 'EAUTH') {
            return res.status(500).json({ message: "Email authentication failed. Please check email credentials." });
        } else if (error.code === 'ENOTFOUND') {
            return res.status(500).json({ message: "Network error. Please check your internet connection." });
        } else if (error.response && error.response.includes('Username and Password not accepted')) {
            return res.status(500).json({ message: "Invalid email credentials. Please use App Password for Gmail." });
        }
        
        res.status(500).json({ message: "Error sending OTP. Please try again." });
    }
}

// Verify OTP
export const verifyOTP = async (req, res) => {
    console.log('VerifyOTP request body:', req.body);
    
    const { email, otp } = req.body;
    
    if (!email || !otp) {
        console.log('Missing data - email:', email, 'otp:', otp);
        return res.status(400).json({ message: "Email and OTP required" });
    }

    try {
        console.log('Looking for user with email:', email);
        const user = await User.findOne({ email });
        if (!user) {
            console.log('User not found for email:', email);
            return res.status(400).json({ message: "User not found" });
        }

        console.log('User OTP:', user.otp, 'Provided OTP:', otp);
        console.log('OTP Expiry:', user.otpExpiry, 'Current Time:', Date.now());
        console.log('Is OTP expired?', Date.now() > user.otpExpiry);

        if (user.otp !== otp) {
            return res.status(400).json({ message: "Invalid OTP" });
        }
        
        if (Date.now() > user.otpExpiry) {
            return res.status(400).json({ message: "OTP has expired" });
        }

        console.log('OTP verification successful');
        res.json({ message: "OTP verified successfully" });
    } catch (error) {
        console.error('VerifyOTP error:', error);
        res.status(500).json({ message: "Error verifying OTP" });
    }
};

// Reset Password
export const resetPassword = async (req, res) => {
    const { email, newPassword } = req.body;
    
    if (!email || !newPassword) {
        return res.status(400).json({ message: "Email and new password required" });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // Hash new password
        user.password = await bcrypt.hash(newPassword, 10);
        user.otp = undefined;
        user.otpExpiry = undefined;
        await user.save();

        res.json({ message: "Password reset successful" });
    } catch (error) {
        console.error('ResetPassword error:', error);
        res.status(500).json({ message: "Error resetting password" });
    }
};