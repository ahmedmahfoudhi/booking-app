import express from "express"
import { deleteUser, getAllUsers, getUser, updateUser } from "../controllers/userController.js";
import { verifyAdmin, verifyUser } from "../middlewares/verifyToken.js";

const router = express.Router()

router.get('/:id',verifyUser,getUser)
router.get('/',verifyAdmin,getAllUsers)
router.put('/:id',verifyUser,updateUser)
router.delete('/:id',verifyUser,deleteUser)

export default router;