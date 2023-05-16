import Hotel from "../models/Hotel.js";

// create a hotel
export const addHotel = async (req,res,next) => {
    const newHotel = new Hotel(req.body)

    try{
        const registredHotel = await newHotel.save()
        res.status(201).json(registredHotel)
    }catch(err){
        next(err)
    }
}

// update a hotel
export const updateHotel = async (req,res,next) => {
    const id = req.params.id;
    try{
        const updatedHotel = await Hotel.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedHotel);     
    }catch(err){
        next(err);
    }
}


// get a hotel
export const getHotel = async (req,res,next) => {
    const id = req.params.id;
    try{
        const hotel = await Hotel.findById(id)
        res.status(200).json(hotel)
    }catch(err){
        next(err)
    }
}

// get all hotels
export const getAllHotels = async (req,res,next) => {
    try {
        const hotels = await Hotel.find()
        res.status(200).json(hotels)
    } catch (err) {
        next(err)
    }
}

// delete a hotel
export const deleteHotel = async (req,res,next) => {
    const id = req.params.id;
    try{
        await Hotel.findByIdAndDelete(id)
        res.status(200).json({
            message : `Hotel with id ${id} has been deleted`
        })
    }catch(err){
        next(err);
    }
}