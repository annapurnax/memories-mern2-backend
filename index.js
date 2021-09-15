//body-parser will enable us to send post requests
//cors-to enable cross origin requests
//express-as a framework for creating the routing of our application
//mongoose to create models
//nodemon to eliminate manually resetin the server
//require("dotenv").config(); //works without type:module
//?everytym a change is made
//the filesnames in .gitignore wont be pushed to github
import express from "express"; //"type":"module"
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import postroutes from "./routes/posts.js";
const app = express(); //we use the express methods on tht app instance

app.use(bodyParser.json({ limit: "30mb", extended: "true" })); //images will be sent with a certain limit
app.use(bodyParser.urlencoded({ limit: "30mb", extended: "true" })); //setting up the bodyParser
app.use(cors()); //shd be before app.use()

app.use("/posts", postroutes); //every route inside postroutes starts with /posts
const PORT = process.env.PORT || 4000; //PORT is an environment variable
const CONNECTION_URL =
  "mongodb+srv://dbuser:admin@cluster0.uzsiu.mongodb.net/memories?retryWrites=true&w=majority";
mongoose
  .connect(CONNECTION_URL, {
    //to prevent errors in the console
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
const connection = mongoose.connection;
connection.once("open", () => {
  //once the connection opens itll show tht msg
  console.log("Mongodb connection established successfully");
});
