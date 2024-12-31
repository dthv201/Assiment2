import UserModel, { iUser } from "../models/user_model";
import { Request, Response } from "express";
import  BaseController  from "./base_controller";
import userModel from "../models/user_model";

class PostController extends BaseController<iUser> {
    constructor() {
        super(userModel);
    }
    async create(req: Request, res: Response) {
        const userId = req.params.userId;
        const post = {
            ...req.body,
            owner: userId
        }
        req.body = post;
        super.create(req, res);
    };

}

export default new PostController();