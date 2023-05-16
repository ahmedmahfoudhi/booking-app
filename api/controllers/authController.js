import User from "../models/User.js"
import { createError } from "../utils/error.js"
import { comparePasswords, hashPassword } from "../utils/handlePasswords.js"
import jwt from 'jsonwebtoken'
export const register = async (req,res,next) => {
    try {
        const {username, email, password} = req.body
        const hashedPassword = await hashPassword(password)
        const user = new User({
            username,
            email, 
            password: hashedPassword
        })
        const registredUser = await user.save()
        const userInfo = extract(registredUser._doc)
        res.status(201).json(userInfo)
    } catch (err) {
        console.log(err.stack)
        next(err)
    }
}


export const login = async (req,res,next) => {
    try {
        const {username,password} = req.body
        const user = await User.findOne({username})
        if(!user){
            return next(createError(404,`Wrong password or username`))
        }
        if(!comparePasswords(password,user._doc.password)){
            return next(createError(404,`Wrong password or username`))
        }
        const userInfo = extract(user._doc)
        const token = generateToken(userInfo._id,user._doc.isAdmin)
        res
        .cookie("access_token",token,{
            httpOnly: true,
        })
        .status(200)
        .json({
            ...userInfo
        })
    } catch (err) {
        next(err)
    }


}


const extract = (user) => {
    const {password, isAdmin, ...userInfo} = user
    return userInfo
}

const generateToken = (id,isAdmin) => {
    return jwt.sign({
        id,
        isAdmin,

    }, process.env.SECRET_KEY)
}