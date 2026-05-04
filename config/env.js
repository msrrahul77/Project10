import dotenv from 'dotenv';

dotenv.config();

const env = {
	PORT: process.env.PORT || 5000,
	MONGO_URI: process.env.MONGO_URI,
	MONGODB_CLOUD: process.env.MONGODB_CLOUD
};
// validation
if (!env.MONGO_URI) {
	console.error('❌ MONGO_URI missing in .env');
	process.exit(1);
}
export default env;
