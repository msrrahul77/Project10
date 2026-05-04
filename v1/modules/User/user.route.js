import express from 'express'
import { UserController } from './user.controller.js'



const router = express.Router()

router.post("/create-user", UserController.createUser)
router.get("/", UserController.getSingleUser)
router.get("/:id", UserController.getSingleUser)
router.patch("/:id", UserController.update)
router.delete("/:id",UserController.remove)
const UserRouter1 = router
export default UserRouter1