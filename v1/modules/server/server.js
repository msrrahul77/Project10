import mongoose from "mongoose"
// import config from '../config';
import { MongoClient, ServerApiVersion } from 'mongodb';
import env from '../../../config/env.js';
// const uri =
// 	'mongodb+srv://rahulrudra245_db_user:bLbhqYgfC16SKNo5@cluster0.9pattvt.mongodb.net/?appName=Cluster0';
const uri = env.MONGODB_CLOUD;
console.log('URI', uri);
const client = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true
	}
});

const server = async () => {
	// await client.connect();
	// Send a ping to confirm a successful connection
	await client.db('admin').command({ ping: 1 });
	console.log('Pinged your deployment. You successfully connected to MongoDB!');

	// mongoose.connect(config.db_url_cloud);

	// mongoose.connect("mongodb://localhost:27017/Dellbazz")
};
export default server