import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import { connectDB } from "./db/connectDB.js";
import authRoutes from './routes/auth.route.js';
import stationRoutes from "./routes/stations.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors())

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/station", stationRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    connectDB();
})