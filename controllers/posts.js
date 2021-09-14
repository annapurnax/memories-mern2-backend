//in this we declare the function for the routes in posts
import mongoose from "mongoose";
import PostMessages from "../models/postMessages.js"; //gives access to real model
export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessages.find(); //find function is asynchronous so we add await
    res.status(200).json(postMessages); //status 200:OK
    console.log("getPosts works");
  } catch (error) {
    res.status(404).json({ message: error.message }); //status 404:not found
    console.log("getPosts failed");
  }
};
export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new PostMessages(post);
  try {
    await newPost.save(); //asynchronous function so we add await
    console.log("createPost worked");
    res.status(201).json(newPost); //status 201:created
  } catch (error) {
    console.log("createPost failed");
    res.status(409).json({ message: error.message }); //error 409:conflict
  }
};
export const updatePost = async (req, res) => {
  const _id = req.params.id; // /:id as in posts routes
  const post = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with that id found");
  //post consists of all the data we recieve from the frontend so its an object which contains {creator,title,message,tags} but not the id so we need to send its id too

  const updatedPost = await PostMessages.findByIdAndUpdate(
    _id,
    { ...post, _id },
    {
      new: true,
    }
  ); //new:true to recieve the updated version of the post
  res.json(updatedPost);
  console.log("post updated");
};
export const deletePost = async (req, res) => {
  const _id = req.params.id; // /:id as in posts routes
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with that id found");
  //post consists of all the data we recieve from the frontend so its an object which contains {creator,title,message,tags} but not the id so we need to send its id too

  await PostMessages.findByIdAndRemove(_id);
  res.json({ message: "post deleted" });
  console.log("post deleted");
};
export const likedPost = async (req, res) => {
  const _id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with that id found");
  const post = await PostMessages.findById(_id);
  const updatedPost = await PostMessages.findByIdAndUpdate(
    _id,
    { likedcount: post.likedcount + 1 },
    { new: true }
  ); //likedcount of post is incremented by 1
  res.json(updatedPost);
  console.log("liked the post");
};
