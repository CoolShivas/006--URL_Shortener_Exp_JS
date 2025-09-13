import express from "express";
import mongoose from "mongoose";

const server = express();

server.use(express.urlencoded({ extended: true })); // Hidding the information or details on URL;

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

server.post("/storing", (request, response) => {
  console.log(request.body);
  response.json({ message: "Details or Data hidding from URL", success: true });
});

const PORT = 5000;

server.listen(PORT, () => {
  console.log(`Server Running at ${PORT}`);
});
