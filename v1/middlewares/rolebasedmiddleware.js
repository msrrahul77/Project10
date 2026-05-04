import RolePermission from "../modules/RoleBased/RoleBased.model.js";

export const checkPermission = (moduleName, action) => {
	return async (req, res, next) => {
		try {
			const user = req.user;

			if (!user) {
				return res.status(401).json({ message: 'Unauthorized' });
			}

			const { tenantId, roleName } = user;

			const role = await RolePermission.findOne({
				tenantId,
				roleName
			});

			if (!role) {
				return res.status(403).json({
					message: 'Role not found'
				});
			}


			const permission = role.permissions.find(p => p.module === moduleName);

			if (!permission) {
				return res.status(403).json({
					message: `No access to module ${moduleName}`
				});
			}


			if (!permission.actions.includes(action)) {
				return res.status(403).json({
					message: `No ${action} permission for ${moduleName}`
				});
			}

			next();
		} catch (err) {
			res.status(500).json({
				message: 'Permission check failed',
				error: err.message
			});
		}
	};
};
