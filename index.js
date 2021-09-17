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
app.use(express.json());
app.use("/posts", postRoutes);
app.get("/", (req, res) => {
  res.send("Yooo");
});
const CONNECTION_URL =
  "mongodb+srv://dbuser:admin@cluster0.uzsiu.mongodb.net/memories?retryWrites=true&w=majority";
const PORT = process.env.PORT || 4000;

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set("useFindAndModify", false);
