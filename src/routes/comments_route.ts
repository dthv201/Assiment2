import express from "express";
import commentsController from "../controllers/comments_controller";

const router = express.Router();

// Routes
router.get("/", commentsController.getAll.bind(commentsController));
router.get("/:id",  commentsController.getById.bind(commentsController));
router.post("/", commentsController.create.bind(commentsController));
router.put("/:id", commentsController.update.bind(commentsController));
router.delete("/:id", commentsController.deleteItem.bind(commentsController));

export default router;
