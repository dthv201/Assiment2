import express from "express";
const router = express.Router();
import commentsController from "../controllers/comments_controller";
import { authMiddleware } from "../controllers/auth_controller";

router.get("/", authMiddleware, commentsController.getAll.bind(commentsController));

router.get("/:id",  authMiddleware, commentsController.getById.bind(commentsController));

router.put("/:id", authMiddleware, commentsController.update.bind(commentsController));

router.post("/", authMiddleware, commentsController.create.bind(commentsController));

router.delete("/:id", authMiddleware, commentsController.deleteItem.bind(commentsController));

export default router;
