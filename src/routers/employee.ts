import { Router } from "express";
import { createEmployee, deleteEmployee, getEmployees, updateEmployee } from "../controllers/employee.js";

const router = Router();

router.post("/", createEmployee);
router.get("/", getEmployees);
router.put("/:id", updateEmployee);     
router.delete("/:id", deleteEmployee); 

export default router;