import express from "express";
import mongoose from "mongoose";
import shortid from "shortid";
import { Url } from "./Models/Url.js";

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
  // // Passing the { shortUrl: null } to index.ejs file for logic purpose;
  response.render("index.ejs", { shortUrl: null });
});

server.post("/storing", async (request, response) => {
  // console.log(request.body);
  const longUrl = request.body.longestURL;
  // console.log("Long Url => ", longUrl); // Getting the Long Url on Terminal;

  const shortCode = shortid.generate();
  // // Taking the shortUrl name as same as we have taken before (Passing the { shortUrl: null } to index.ejs file for logic purpose) as we are going to pass it again below;
  const shortUrl = `http://localhost:5000/${shortCode}`;

  // // Saving the data on MongoDB DataBase;
  // // Beware of Schema naming (shortCode: String, longUrl: String,) and this new Url naming should be same (new Url({ shortCode, longUrl })) to save the data properly;
  const newUrl = new Url({ shortCode, longUrl });
  await newUrl.save();

  console.log("Short Url Saved => ", newUrl);

  response.render("index.ejs", { shortUrl });
});

const PORT = 5000;

server.listen(PORT, () => {
  console.log(`Server Running at ${PORT}`);
});
