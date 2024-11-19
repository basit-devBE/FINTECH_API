import asyncHandler from "express-async-handler";
import User from "../models/Users.js";
import { hashPassword } from "../utils/hashpassword.js";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const validateEmail = (email) => {
    return emailRegex.test(email);
};

const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
const validatePassword = (password) => {
    return passwordRegex.test(password);
};
const validatePhoneNumber = (phone_number) => {
    return phone_number.length === 10;
};


export const registerUser = asyncHandler(async (req, res) => {
    const{name,password,email,phone_number} = req.body
    if(!name || !password || !email || !phone_number){
       return res.status(400).json({message:"Provide the valid information"})
    }
    if(!validateEmail(email)){
        return res.status(400).json({message: "Invalid Email"})
    }
    if(!validatePassword(password)){
        return res.status(400).json({message: "Password must contain at least one number, one uppercase and lowercase letter, and at least 6 or more characters"})
    }
    if(!validatePhoneNumber(phone_number)){
        return res.status(400).json({message: "Invalid Phone Number"})
    }
   
    const userExists = await User.findOne({email})
    if(userExists){
        return res.status(400).json({message: "User already exists"})
    }

    const hashedPassword = await hashPassword(password)
    try{
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        phone_number
    })
    if(user){
        return res.status(201).json({
            message: "User created successfully",
            user:{
                name: user.name,
                email: user.email,
                phone_number: user.phone_number
            }
        })
    }
    return res.status(400).json({message: "Invalid user data"})
}catch(error){
    return res.status(500).json({message: `${error.message}`})
}
});
