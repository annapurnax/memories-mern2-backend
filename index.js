//body-parser will enable us to send post requests
//cors-to enable cross origin requests
//express-as a framework for creating the routing of our application
//mongoose to create models
//nodemon to eliminate manually resetin the server
//require("dotenv").config(); //works without type:module
//?everytym a change is made
//the filesnames in .gitignore wont be pushed to github
//app.use(bodyParser.json({ limit: "30mb", extended: "true" })); images will be sent with a certain limit
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import postRoutes from "./routes/posts.js";

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/posts", postRoutes);

const CONNECTION_URL =
  "mongodb+srv://js_mastery:123123123@practice.jto9p.mongodb.net/test";
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set("useFindAndModify", false);
