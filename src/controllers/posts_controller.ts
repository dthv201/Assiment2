import postModel, { iPost } from "../models/posts_model";
import { Request, Response } from "express";
import  BaseController  from "./base_controller";

class PostController extends BaseController<iPost> {
    constructor() {
        super(postModel);
    }

    async create(req: Request, res: Response): Promise<void> {
        // const userId = req.params.userId;
        // if (!userId) {
        //   res.status(400).send("User ID is required");
        //   return Promise.resolve();
        // }
        // req.body.owner = userId;
        super.create(req, res);
    };
      
}

export default new PostController();