import express from 'express';
import { env } from './util/env/env';
import { authRouter } from './router/auth.route';
import { pointRouter } from './router/point.route';
import cors from 'cors';
import { adminRouter } from './router/admin.route';
const app = express();
app.use(cors({ origin: env.CORS_ORIGIN }));
app.use(express.json());
app.use("/auth", authRouter);
app.use("/points", pointRouter);
app.use("/admin", adminRouter);
app.listen(env.PORT, () => {
    console.log(`Server is running on http://localhost:${env.PORT}`);
});