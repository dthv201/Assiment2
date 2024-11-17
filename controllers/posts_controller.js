const postModel = require("../models/posts_model");


const createPost = async (req, res) => {
    const post = req.body;
    try {
      const newPost = await postModel.create(post);
      res.status(201).send(newPost);
    } catch (error) {
      res.status(400).send(error);
    }
  };

module.exports = { createPost };

const getPostById = async (req, res) => {
  const postId = req.params.id;

  try {
    const posts = await postModel.findById(postId);
    res.status(200).send(posts);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = { getPostById };

