import RolePermission from "./RoleBased.model.js";
import { RoleBasedService } from './rolebased.service.js';

//  const createRole = async (data) => {
//   const role = await RolePermission.create(data);
//   return role;
// };
const createRole = async (req, res) => {
	try {
		const result = await RoleBasedService.createRole(req.body);
		res.status(200).json({
			data: result,
			message: 'Create Role Done'
		});
	} catch (error) {
		res.status(400).json({ data: result, message: 'Create Role Failed' });
	}
};

const getRoles = async (tenantId) => {

const data=await RolePermission.find({ tenantId });
  return data
};


const getRoleById = async (id) => {
     const data= await RolePermission.findById(id);
  return data
};

const updateRole = async (id, data) => {

    const result=await RolePermission.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  return result
};


 const deleteRole = async (id) => {

    const result=await RolePermission.findByIdAndDelete(id);
  return result
};

export const RoleBasedController={createRole,getRoles,getRoleById,updateRole,deleteRole}