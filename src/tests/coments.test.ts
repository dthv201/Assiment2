import request from "supertest";
import initApp from "../server";
import mongoose from "mongoose";
import commentsModel from "../models/comments_model";
import { Express } from "express";

let app: Express;

beforeAll(async () => {
    app = await initApp();
    console.log("beforeAll");
    await commentsModel.deleteMany({});
    const comments = await commentsModel.find();
    console.log("Comments after deleteMany:", comments); // This should log an empty array
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
    test("Comment test get all comments initially empty", async () => {
        await commentsModel.deleteMany({}); // Clear the database
        const response = await request(app).get("/comments");
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveLength(0); // Now it should work
      });
      

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

   test("Comment test get all comments", async () => {
      const response = await request(app).get("/comments");
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveLength(1);
    });

    test("Comment test get all comments by owner", async () => {
      const response = await request(app).get(`/comments?owner=${testComment.owner}`);
      expect(response.statusCode).toBe(200);
    });

  test("Get a comment by ID", async () => {
    const response = await request(app)
      .get(`/comments/${commentId}`)
      .expect(200);

    expect(response.body).toHaveProperty("_id", commentId);
    expect(response.body.comment).toBe(testComment.comment);
    expect(response.body.postId).toBe(testComment.postId);
    expect(response.body.owner).toBe(testComment.owner);
  });

  test("Update a comment", async () => {
    const updatedComment = {
      comment: "Updated comment",
      postId: "1234567890abcdef12345678",
      owner: "Updated Owner",
    };

    const response = await request(app)
      .put(`/comments/${commentId}`)
      .send(updatedComment)
      .expect(200);

    expect(response.body).toHaveProperty("_id", commentId);
    expect(response.body.comment).toBe(updatedComment.comment);
    expect(response.body.postId).toBe(updatedComment.postId);
    expect(response.body.owner).toBe(updatedComment.owner);
  });

  test("Test Delete a comment in secsess", async () => {
    const response = await request(app).delete("/comments/" + commentId);
    expect(response.statusCode).toBe(204);
    const response2 = await request(app).get("/comments/" + commentId);
    expect(response2.statusCode).toBe(404);
  });

  test("Test Delete a comment not found", async () => {
    const response = await request(app).delete("/comments/" + commentId);
    expect(response.statusCode).toBe(404);

  });


  test("Delete a non-existent comment", async () => {
    const response = await request(app)
      .delete("/comments/" + invalidComment)
      .expect(400); 
      
    expect(response.body).toHaveProperty("message");
  });
  
  

});