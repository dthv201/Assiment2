import { postModel, IPost } from "../models/posts_model";
import { Request, Response } from "express";
import createController from "./base_controller";

const postsController = createController<IPost>(postModel);

export default postsController;