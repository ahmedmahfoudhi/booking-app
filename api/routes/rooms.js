import express from "express"
import { addRoom, deleteRoom, getRoom, getRooms, updateRoom } from "../controllers/roomController.js";
import { verifyAdmin } from "../middlewares/verifyToken.js";

const router = express.Router()

router.get('/:id',getRoom)
router.get('/',getRooms)
router.post('/:hotelId',verifyAdmin,addRoom)
router.put('/:id',verifyAdmin,updateRoom)
router.delete('/:id',verifyAdmin,deleteRoom)

export default router;