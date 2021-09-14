import mongoose from "mongoose";
const postSchema = mongoose.Schema({
  title: String,
  message: String,
  creator: String,
  tags: [String], //an array of strings
  selectedFile: String,
  likedcount: {
    //is an object with type and default
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const PostMessages = mongoose.model("postMessages", postSchema);

export default PostMessages;
