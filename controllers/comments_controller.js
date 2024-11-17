const Comment = require("../models/comments_model");

const createComment = async (req, res) => {
  const newComment = new Comment(req.body);

  try {
    const savedComment = await newComment.save();
    res.status(201).send(savedComment);
  } catch (error) {
    res.status(400).send(error);
  }
};


const updateComment = async (req, res) => {
  const commentId = req.params.id;
  const updateData = req.body;

  try {
    const updatedComment = await Comment.findByIdAndUpdate(commentId, updateData, { new: true });
    res.status(200).send(updatedComment);
  } catch (error) {
    res.status(400).send(error);
  }
};

const deleteComment = async (req, res) => {
  const commentId = req.params.id;

  try {
    await Comment.findByIdAndDelete(commentId);
    res.status(200).send({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  createComment,
 
  updateComment,
  deleteComment,
};