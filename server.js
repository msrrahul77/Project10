
import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
// import { env } from "./config/env.js";
import { connectDB } from "./config/db.js";
import router from "./route.js";
import AddressRouter from "./v1/modules/Address/Address.route.js";
import TenantRouter from './v1/modules/Tenant/tenant.route.js';
import RoleBasedRoute from './v1/modules/RoleBased/rolebased.route.js';
import server from './v1/modules/server/server.js';
import env1 from './config/env.js';
import { AuthRoute } from './v1/modules/auth/route/auth.route.js';
const app = express();

const PORT = env1.PORT;
// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(helmet());

app.use(router);

app.get('/', (req, res) => {
	res.send('Server running || 🚀');
});

app.use('/api/v1/address', AddressRouter);
app.use('/api/v1/tenant', TenantRouter);
app.use('/api/v1/auth', AuthRoute);
app.use('/api/v1/role-based', RoleBasedRoute);
app.get('/api/v1', (req, res) => {
	res.json({ message: 'API v1 working ✅' });
});

const startServer = async () => {
	try {
		await connectDB();
		// server();
		app.listen(PORT, () => {
			console.log(`🚀 Server running on port ${PORT}`);
		});
	} catch (err) {
		console.error('❌ Server start failed:', err.message);
	}
};

startServer();
