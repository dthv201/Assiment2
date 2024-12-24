import request from "supertest";
import initApp from "../server";
import mongoose from "mongoose";
import commentsModel from "../models/comments_model";
import { Express } from "express";

let app: Express;

beforeAll(async () => {
  app = await initApp();
  console.log("beforeAll");
  await commentsModel.deleteMany();
});

afterAll(async () => {
  console.log("afterAll");
  await mongoose.connection.close();
});

let commentId = "";
const testComment = {
  comment: "This is a test comment",
  postId: "676aed82c92c60d154870c7d",
  owner: "Test Owner",
};
const invalidComment = {
  comment: "This is a test comment",
  postId: "676aed82c92c60d154870c7d",
};

describe("Comments test suite", () => {
  test("Create a new comment", async () => {
    const response = await request(app)
      .post("/comments")
      .send(testComment)
      .expect(201);

    expect(response.body).toHaveProperty("_id");
    expect(response.body.comment).toBe(testComment.comment);
    expect(response.body.postId).toBe(testComment.postId);
    expect(response.body.owner).toBe(testComment.owner);

    commentId = response.body._id;
  });

   test("Post test get all comments", async () => {
      const response = await request(app).get("/comments");
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveLength(0);
    });

//   test("Get a comment by ID", async () => {
//     const response = await request(app)
//       .get(`/comments/${commentId}`)
//       .expect(200);

//     expect(response.body).toHaveProperty("_id", commentId);
//     expect(response.body.comment).toBe(testComment.comment);
//     expect(response.body.postId).toBe(testComment.postId);
//     expect(response.body.owner).toBe(testComment.owner);
//   });

//   test("Update a comment", async () => {
//     const updatedComment = {
//       comment: "Updated comment",
//       postId: "1234567890abcdef12345678",
//       owner: "Updated Owner",
//     };

//     const response = await request(app)
//       .put(`/comments/${commentId}`)
//       .send(updatedComment)
//       .expect(200);

//     expect(response.body).toHaveProperty("_id", commentId);
//     expect(response.body.comment).toBe(updatedComment.comment);
//     expect(response.body.postId).toBe(updatedComment.postId);
//     expect(response.body.owner).toBe(updatedComment.owner);
//   });

//   test("Delete a comment", async () => {
//     await request(app)
//       .delete(`/comments/${commentId}`)
//       .expect(204);

//     const response = await request(app)
//       .get(`/comments/${commentId}`)
//       .expect(404);

//     expect(response.body).toHaveProperty("message", "Comment not found");
//   });

//   test("Create a comment with missing owner", async () => {
//     const response = await request(app)
//       .post("/comments")
//       .send(invalidComment)
//       .expect(400);

//     expect(response.body).toHaveProperty("errors");
//     expect(response.body.errors).toHaveProperty("owner");
//   });
});