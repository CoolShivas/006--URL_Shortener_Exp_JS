import express from "express";
import mongoose from "mongoose";
import path from "path";
import { getOriginalUrlFunc, shortUrlFunc } from "./Controllers/url.js";

const server = express();

server.use(express.urlencoded({ extended: true })); // Hidding the information or details on URL;
server.use(express.static(path.join(path.resolve(), "Components")));

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
  // // Passing the { shortUrl: null } to index.ejs file for logic purpose;
  response.render("index.ejs", { shortUrl: null });
});

server.post("/storing", shortUrlFunc);

// // // When we get the short url if user click on it render it by dynamically change the shortUrl to original Url (longUrl) to another page not on same page;
server.get("/:shortToLong", getOriginalUrlFunc);

const PORT = 5000;

server.listen(PORT, () => {
  console.log(`Server Running at ${PORT}`);
});
