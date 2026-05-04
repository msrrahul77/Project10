import mongoose from "mongoose";
import env from './env.js';

// import config from '../v1/modules/config/index.js';

export const connectDB = async () => {
	try {
		await mongoose.connect(env.MONGODB_CLOUD);
		console.log('✅ MongoDB Connected');
	} catch (error) {
		console.error('❌ DB Connection Failed:', error.message);
		process.exit(1);
	}
};
