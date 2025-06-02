import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { createStation, allStations, updateStation, deleteStation } from "../controllers/station.controller.js";

const router = express.Router()

router.post("/create", protectRoute, createStation);

router.get("/all", protectRoute, allStations);

router.put("/update/:id", protectRoute, updateStation);

router.delete("/delete/:id", protectRoute, deleteStation)

export default router;