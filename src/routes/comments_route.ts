import express from "express";
const router = express.Router();
import commentsController from "../controllers/comments_controller";
// import { authMiddleware } from "../controllers/auth_controller";

router.get("/", commentsController.getAll.bind(commentsController));

router.get("/:id", (req, res) => {
    commentsController.getById(req, res);
});

router.post("/", commentsController.create.bind(commentsController));

router.put("/:id", commentsController.update.bind(commentsController));

router.delete("/:id", commentsController.deleteItem.bind(commentsController));

export default router;