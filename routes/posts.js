//prefix of /posts/
//importin the name and not a default import
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likedPost,
} from "../controllers/posts.js"; //.js would not be needed in react but in node it is needed
import express from "express";
const router = express.Router();
router.get("/", getPosts);
router.post("/", createPost);
router.patch("/:id", updatePost); //patch is used for updating existing documents
router.patch("/:id/likedpost", likedPost); //liking a post is basically updating so ths why we use patch
router.delete("/:id", deletePost);
export default router;
