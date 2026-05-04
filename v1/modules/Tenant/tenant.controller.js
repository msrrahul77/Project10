import { Tenant } from './tenant.model.js';

const createTenant = async (req, res) => {
	try {
		console.log('req.body', req.body);

		const tenantData = new Tenant(req.body);
		const result = await tenantData.save();

		res.status(201).json({
			data: result
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: 'Failed to create Tenant',
			error: error.message
		});
	}
};

const getTenant = async (req, res) => {
	try {
		const data = await Tenant.find();
		res.status(200).json({ data });
	} catch (error) {
		res.status(500).json({
			message: 'Failed to fetch Tenant',
			error: error.message
		});
	}
};

const getSingleTenant = async (req, res) => {
	try {
		const id = req.params.id;
		const data = await Tenant.findById(id);

		if (!data) {
			return res.status(404).json({ message: 'Tenant not found' });
		}

		res.status(200).json({ data });
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: 'Error fetching Tenant',
			error: error.message
		});
	}
};

const update = async (req, res) => {
	try {
		const id = req.params.id;

		const updatedData = await Tenant.findByIdAndUpdate(id, req.body, {
			new: true,
			runValidators: true
		});

		if (!updatedData) {
			return res.status(404).json({ message: 'Address not found' });
		}

		res.status(200).json({ data: updatedData });
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: 'Failed to update address',
			error: error.message
		});
	}
};

const remove = async (req, res) => {
	try {
		const id = req.params.id;

		const deletedUser = await Tenant.findByIdAndDelete(id);

		if (!deletedUser) {
			return res.status(404).json({ message: 'Not Found' });
		}

		res.status(200).json({
			message: 'Address deleted successfully',
			deletedUser
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Server Error' });
	}
};

export const TenantController = {
	createTenant,
	getTenant,
	getSingleTenant,
	update,
	remove
};
