import express from "express"
import { addHotel, deleteHotel, getAllHotels, getHotel, updateHotel } from "../controllers/hotelControler.js";
import { verifyAdmin } from "../middlewares/verifyToken.js";


const router = express.Router()


// ADD a new Hotel
router.post("/",verifyAdmin,addHotel)

// Update an existing Hotel
router.put("/:id", verifyAdmin, updateHotel)


// GET a Hotel
router.get("/:id", verifyAdmin, getHotel)

// Get all Hotels
router.get("/", verifyAdmin, getAllHotels)

// Delete an Hotel
router.delete("/:id", verifyAdmin, deleteHotel)


export default router;