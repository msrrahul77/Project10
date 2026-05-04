import RolePermission from "./RoleBased.model.js";

 const createRole = async data => {
	const role = await RolePermission.create(data);
	return role;
};

 const getRoles = async tenantId => {
	return await RolePermission.find({ tenantId });
};

 const getRoleById = async id => {
	return await RolePermission.findById(id);
};
 const updateRole = async (id, data) => {
	return await RolePermission.findByIdAndUpdate(id, data, {
		new: true,
		runValidators: true
	});
};

 const deleteRole = async id => {
	return await RolePermission.findByIdAndDelete(id);
};

export  const RoleBasedService={createRole,getRoleById,getRoles,updateRole,deleteRole}
