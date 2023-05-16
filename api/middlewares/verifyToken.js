import jwt from 'jsonwebtoken'
import {createError} from './../utils/error.js'

export const verifyToken = (req,res,next) => {
    console.log("inside verify token")
    const token = req.cookies.access_token
    console.log(token)
    if(!token){
        return next(createError(401,"You should login first"))
    }

    jwt.verify(token,process.env.SECRET_KEY, (err,user) => {
        if(err) return next(createError(403,"Invalid Toekn"))
        req.user = user
        next()
    })
}


export const verifyUser = (req,res,next) => {
    console.log("inside verify user")
    verifyToken(req,res, () => {
        if(req.user.id === req.params.id || req.user.isAdmin) next()
        else next(createError(403,"You are not authorized!"))
    })
}

export const verifyAdmin = (req,res,next) => {
    console.log("inside verify admin")
    verifyToken(req,res, (err) => {
        if(err) return next(err)
        if(req.user.isAdmin) next()
        else next(createError(403,"You are not authorized!"))
    })
}