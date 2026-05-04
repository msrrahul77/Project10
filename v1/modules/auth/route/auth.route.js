import express from "express"
import { AuthController } from "../controller/auth.controller.js"

const router = express.Router()

router.post("/register", AuthController.registerUser)
router.post("/login", AuthController.loginUser)

export const AuthRoute=router