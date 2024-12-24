import express from "express";
import commentsController from "../controllers/comments_controller";

const router = express.Router();

// Routes
router.get("/", (req, res) => commentsController.getAll(req, res));
router.get("/:id", (req, res) => commentsController.getById(req, res));
router.post("/", (req, res) => commentsController.create(req, res));
router.put("/:id", (req, res) => commentsController.update(req, res));
router.delete("/:id", (req, res) => commentsController.deleteItem(req, res));

export default router;
