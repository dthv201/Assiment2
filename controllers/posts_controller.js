const postModel = require("../models/posts_model");

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