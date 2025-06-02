import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";

dotenv.config();

export const signup = async (req, res) => {
    const {email, name, password} = req.body;
    try {
        if(!name || !email || !password){
            throw new Error("All fields are required");
        }
        const userAlreadyExists = await User.findOne({email});
        if(userAlreadyExists){
            throw new Error("User already exists");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            email,
            password: hashedPassword,
            name,
        })
        await user.save();

        generateTokenAndSetCookie(res, user._id);

        res.status(201).json({
            success: true,
            message: "User created successfully",
            user: {
                ...user._doc,
                password: undefined,
            }
        })
    } catch (error) {
        res.status(400).json({success:false, message: error.message});
    }
}

export const login = async(req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({success: false, message: "Invalid credentials"});
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(400).json({success: false, message: "Invalid credentials"});
        }
        generateTokenAndSetCookie(res, user._id);
        await user.save();
        res.status(200).json({
            success: true, 
            message: "Loggedin successfully",
            user: {
                ...user._doc,
                password: undefined,
            }
        })
    } catch (error) {
        console.log("Error in login: ", error);
        res.status(400).json({success: false, message: error.message});
    }
}

export const logout = async(req, res) => {
    res.clearCookie("token");
    res.status(200).json({success: true, message: "Logged out successfully"});
}

export const checkAuth = async(req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password");
        if(!user){
            return res.status(400).json({success: false, message: "User not found"});
        }
        res.status(200).json({success: true, message: user});
    } catch (error) {
        console.log("Error in checkAuth ", error);
        res.status(400).json({success: false, message: error.message});
    }
}