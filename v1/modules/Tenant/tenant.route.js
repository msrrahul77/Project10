import express from 'express'
import { TenantController } from './tenant.controller.js';



const router = express.Router()

router.post("/create-tenant", TenantController.createTenant)
router.get("/", TenantController.getTenant)
router.get("/:id",TenantController.getSingleTenant)
router.patch("/:id", TenantController.update)
router.delete("/:id",TenantController.remove)
const TenantRouter = router
export default TenantRouter