import express from 'express';
import { RoleBasedController } from './rolebased.controller.js';
import { checkPermission } from '../../middlewares/rolebasedmiddleware.js';

const router = express.Router();

router.post(
	'/create',
	checkPermission('USER', 'CREATE'),
	RoleBasedController.createRole
);

const RoleBasedRoute = router;
export default RoleBasedRoute;
