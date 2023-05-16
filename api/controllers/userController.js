import User from "../models/User.js";
import { createError } from "../utils/error.js";



// update a user
export const updateUser = async (req,res,next) => {
    const id = req.params.id;
    try{
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true }
        );
        if(!updatedUser){
            return next(createError(404,`User with id ${id} does not exist`))
        }
        const userInfo = extract(updatedUser._doc)
        res.status(200).json(userInfo);     
    }catch(err){
        next(err);
    }
}


// get a user
export const getUser = async (req,res,next) => {
    const id = req.params.id;
    try{
        const user = await User.findById(id)
        if(!user){
            return next(createError(404,`User with id ${id} does not exist`))
        }
        const userInfo = extract(user._doc)
        res.status(200).json({
            ...userInfo
        })
    }catch(err){
        next(err)
    }
}

// get all users
export const getAllUsers = async (req,res,next) => {
    try {
        const users = await User.find()
        const usersInfo = users.map(user => extract(user))
        res.status(200).json(users)
    } catch (err) {
        next(err)
    }
}

// delete a user
export const deleteUser = async (req,res,next) => {
    const id = req.params.id;
    try{
        await User.findByIdAndDelete(id)
        res.status(200).json({
            message : `User with id ${id} has been deleted`
        })
    }catch(err){
        next(err);
    }
}


const extract = (user) => {
    const {password,isAdmin,...userInfo} = user
    return userInfo
}