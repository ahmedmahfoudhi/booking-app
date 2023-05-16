import Room from '../models/Room.js'
import Hotel from '../models/Hotel.js'
import { createError } from '../utils/error.js';

// add a room
export const addRoom = async (req,res,next) => {
    const hotelId = req.params.hotelId;
    const newRoom = new Room(req.body)
    try {
        const savedRoom = await newRoom.save()
        try {
            await Hotel.findByIdAndUpdate(hotelId,{
                $push: {rooms: savedRoom._id }
            })
            res.status(201).json(savedRoom)
        } catch (err) {
            next(err)
        }
    } catch (err) {
        next(err)
    }
}

// updated room
export const updateRoom = async(req,res,next) => {
    const roomId = req.params.id
    try {
        const updatedRoom = await Room.findByIdAndUpdate(
            roomId,
            {$set: req.body},
            { new : true}
        )
        res.status(200).json(updatedRoom)

    } catch (err) {
        next(err)
    }
}

// delete a room
export const deleteRoom = async (req,res,next) => {
    const roomId = req.params.id
    const hotelId = req.body.hotelId
    try {
        await Room.findByIdAndDelete(roomId)
        try {
            await Hotel.findByIdAndUpdate(hotelId,{
                $pull: {rooms: roomId }
            })
            res.status(201).json({
                message: `Room ${roomId} has been removed from Hotel ${hotelId}`
            })
        } catch (err) {
            next(err)
        }
    } catch (err) {
        next(err)
    }
}

// get a room
export const getRoom = async (req,res,next) => {
    const roomId = req.params.id
    try {
        const room = await Room.findById(roomId)
        if(!room){
            next(createError(404,`Room ${roomId} does not exist`))
        }
        res.status(200).json(room)
    } catch (err) {
        next(err)
    }
}

// get all rooms
export const getRooms = async (req,res,next) => {
    try {
        const rooms = await Room.find()
        res.status(200).json(rooms)
    } catch (err) {
        next(err)
    }
}