import { Request, Response } from "express";
import commentsModel, { IComment } from "../models/comments_model";

import BaseController from "./base_controller"; // Assuming you have a base controller

class CommentsController extends BaseController<IComment> {
  constructor() {
    super(commentsModel);
}

// async create(req: Request, res: Response): Promise<void> {
//     super.create(req, res);
//   };
}
export default new CommentsController();
