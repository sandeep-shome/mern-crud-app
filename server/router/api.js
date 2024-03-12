import express from "express";
import {
  createEmploye,
  deleteEmployee,
  getEmployees,
  updateEmployee,
} from "../controllers/api.js";
const router = express.Router();

//adding employee route
router.post("/add", createEmploye);

//getting employee route
router.get("/employees", getEmployees);

//updating employee route
router.put("/update/:id", updateEmployee);

//deleting employee route
router.delete("/delete/:id", deleteEmployee);

export default router;
