import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authRoute from './routes/auth.js'
import usersRoute from './routes/users.js'
import hotelsRoute from './routes/hotels.js'
import roomsRoute from './routes/rooms.js'
import cookieParser from 'cookie-parser'

dotenv.config()

const app = express()

const PORT = process.env.PORT || 8001

const connect = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('Successfully connected to MONGO DB')
    }catch(err){
        throw err;
    }
}

// middlewares
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/auth",authRoute)
app.use("/users",usersRoute)
app.use("/hotels",hotelsRoute)
app.use("/rooms",roomsRoute)

app.use((err,req,res,next) => {
    const errStatus = err.status || 500
    const errMessage = err.message || "Something went wrong"
    res.status(errStatus).json({
        message: errMessage,
        status: errStatus,
    })
})


app.listen(8000,() => {
    connect()
    console.log(`Listening on ${PORT}`)
})