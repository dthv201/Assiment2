import express, { Express } from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import postsRoutes from "./routes/posts_route";
import commentsRoutes from "./routes/comments_route";
import authRoutes from "./routes/auth_route";
import bodyParser from "body-parser";

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to database"));

const initApp = async () => {
  return new Promise<Express>((resolve, reject) => {
    db.on("error", (err) => {
      console.error(err);
    });
    db.once("open", () => {
      console.log("Connected to MongoDB");
    });

    if (process.env.DB_CONNECTION === undefined) {
      console.error("MONGO_URI is not set");
      reject();
    } else {
      mongoose.connect(process.env.DB_CONNECTION).then(() => {
        console.log("initApp finish");

        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));

        app.use("/auth", authRoutes);
        app.use("/posts", postsRoutes);
        app.use("/comments", commentsRoutes);

        resolve(app);
      });
    }
  });
};

export default initApp;