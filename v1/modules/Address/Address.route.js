import express from 'express'
import { AddressController } from './Address.controller.js';
import { verifyToken } from '../../middlewares/auth.middleware.js';



const router = express.Router()

router.post("/create-address",verifyToken, AddressController.createAddress)
router.get("/", AddressController.getAddress)
router.get("/:id", AddressController.getSingleAddress)
router.patch("/:id", AddressController.update)
router.delete("/:id",AddressController.remove)
const AddressRouter = router
export default AddressRouter