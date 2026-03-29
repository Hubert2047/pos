import { Router } from "express";
import { createRevenue, deleteRevenue, getRevenues, updateRevenue } from "../controllers/revenue.js";

const router = Router();

router.post("/", createRevenue);
router.get("/", getRevenues);
router.put("/:id", updateRevenue);     
router.delete("/:id", deleteRevenue); 

export default router;