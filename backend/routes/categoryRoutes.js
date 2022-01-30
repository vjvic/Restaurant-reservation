import express from "express";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";
import {
  createCategory,
  getAllCategory,
  deleteCategory,
  updateCategory,
  getCategoryById,
} from "../controllers/categoryController.js";

router.route("/").post(protect, createCategory).get(protect, getAllCategory);
router
  .route("/:id")
  .get(protect, getCategoryById)
  .delete(protect, deleteCategory)
  .put(protect, updateCategory);

export default router;
