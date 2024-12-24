import express, { RequestHandler } from "express";
import commentsController from "../controllers/comments_controller";

const router = express.Router();

// Define the routes
router.get("/", commentsController.getAll as RequestHandler);
router.get("/:id", commentsController.getById as RequestHandler);
router.post("/", commentsController.create.bind(commentsController) as RequestHandler);
router.put("/:id", commentsController.update.bind(commentsController) as RequestHandler);
router.delete("/:id", commentsController.deleteItem.bind(commentsController) as RequestHandler);

export default router;
