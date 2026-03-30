import { Router } from "express";
import {
  getItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem
} from "../controllers/item.js";
import authenticateToken from "../middlewares/auth.js";

const router = Router();

router.get("/",authenticateToken, getItems);        
router.get("/:id", authenticateToken, getItemById);   
router.post("/", authenticateToken, createItem);       
router.put("/:id", authenticateToken, updateItem);     
router.delete("/:id", authenticateToken, deleteItem); 
export default router;