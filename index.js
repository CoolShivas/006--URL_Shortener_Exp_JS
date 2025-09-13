import express from "express";
import mongoose from "mongoose";

const server = express();

mongoose
  .connect(
    "mongodb+srv://shivas2710cool00_db_user:PK9bmeDXdV5edZLf@cluster0.reupciq.mongodb.net/",
    {
      dbName: "URL_Shortener_Project",
    }
  )
  .then(() => console.log("MongoDB Connected Successfully...!"))
  .catch((err) => console.log(err));

server.get("/", (request, response) => {
  response.render("index.ejs");
});

const PORT = 5000;

server.listen(PORT, () => {
  console.log(`Server Running at ${PORT}`);
});
