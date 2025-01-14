import request from "supertest";
import initApp from "../server";
import mongoose from "mongoose";
import postModel from "../models/posts_model";
import { Express } from "express";

let app: Express;

beforeAll(async () => {
  app = await initApp();
  console.log("beforeAll");
  await postModel.deleteMany();
});

afterAll(async () => {
  console.log("afterAll");
  await mongoose.connection.close();
});

var postId = "";
const testPost = {
  title: "Test title",
  content: "Test content",
  owner: "Eliav",
};
const invalidPost = {
  title: "Test title",
  content: "Test content",
};

describe("Posts test suite", () => {
  
  test("Fail to get all post", async () => {

   
  });


  test("Post test get all posts", async () => {
    const response = await request(app).get("/posts");
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(0);
  });

  test("Test Addding new post", async () => {
    const response = await request(app).post("/posts").send(testPost);
    expect(response.statusCode).toBe(201);
    expect(response.body.title).toBe(testPost.title);
    expect(response.body.content).toBe(testPost.content);
    expect(response.body.owner).toBe(testPost.owner);
    postId = response.body._id;
  });

  test("Test Addding invalid post", async () => {
    const response = await request(app).post("/posts").send(invalidPost);
    expect(response.statusCode).not.toBe(201);
  });

  test("Test get all posts after adding", async () => {
    const response = await request(app).get("/posts");
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(1);
  });

  test("Test get post by owner", async () => {
    const response = await request(app).get("/posts?owner=" + testPost.owner);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].owner).toBe(testPost.owner);
  });



  test("Test get post by id", async () => {
    const response = await request(app).get("/posts/" + postId);
    expect(response.statusCode).toBe(200);
    expect(response.body._id).toBe(postId);
  });

  test("Test get post by id fail", async () => {
    const response = await request(app).get("/posts/67447b032ce3164be7c4412d");
    expect(response.statusCode).toBe(404);
  });

  test("Test updating a post", async () => {
    const updatedPost = {
      title: "Updated title",
      content: "Updated content",
    };
    const response = await request(app).put(`/posts/${postId}`).send(updatedPost);
  
    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe(updatedPost.title);
    expect(response.body.content).toBe(updatedPost.content);
  });






    test("Test Delete a post in secsess", async () => {
    const response = await request(app).delete("/posts/" + postId);
    expect(response.statusCode).toBe(204);
    const response2 = await request(app).get("/posts/" + postId);
    expect(response2.statusCode).toBe(404);
  });

  test("Test not found updating a post", async () => {
    const updatedPost = {
      title: "Updated title",
      content: "Updated content",
    };
    const response = await request(app).put(`/posts/${postId}`).send(updatedPost);
  
    expect(response.statusCode).toBe(404);
  });

  

  test("Test delete a invalid postId", async () => {
    const invalidId = "invalidId"; 
    const response = await request(app)
      .delete(`/posts/${invalidId}`)
      .expect(400); 
    expect(response.body).toHaveProperty("message", "Invalid ID format");
  });

  test("Test delete post not found", async () => {
    const response = await request(app)
      .delete(`/posts/${postId}`)
      .expect(404); 
    expect(response.body).toHaveProperty("message", "Post not found");
  });

  



});