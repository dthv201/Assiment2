import { Request, Response } from "express";
import commentsModel from "../models/comments_model";

class CommentsController {
    async getAll(req: Request, res: Response) {
        try {
            const comments = await commentsModel.find();
            res.status(200).json(comments);
        } catch (error) {
            res.status(500).json({ message: "Error fetching comments", error });
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const comment = await commentsModel.findById(req.params.id);
            if (!comment) {
                return res.status(404).json({ message: "Comment not found" });
            }
            res.status(200).json(comment);
        } catch (error) {
            res.status(500).json({ message: "Error fetching comment", error });
        }
    }

    async create(req: Request, res: Response) {
        try {
            const newComment = new commentsModel(req.body);
            await newComment.save();
            res.status(201).json(newComment);
        } catch (error) {
            res.status(500).json({ message: "Error creating comment", error });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const updatedComment = await commentsModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!updatedComment) {
                return res.status(404).json({ message: "Comment not found" });
            }
            res.status(200).json(updatedComment);
        } catch (error) {
            res.status(500).json({ message: "Error updating comment", error });
        }
    }

    async deleteItem(req: Request, res: Response) {
        try {
            const deletedComment = await commentsModel.findByIdAndDelete(req.params.id);
            if (!deletedComment) {
                return res.status(404).json({ message: "Comment not found" });
            }
            res.status(200).json({ message: "Comment deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: "Error deleting comment", error });
        }
    }
}

export default new CommentsController();