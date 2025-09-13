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

// // // When we get the short url if user click on it render it by dynamically change the shortUrl to original Url (longUrl) to another page not on same page;
server.get("/:shortToLong", (req, res) => {
  // // Using params to get the dynamic shortCode after slash in url;
  // // And, while using params we have to take the dynamic route i.e,(/:shortToLong) as req.params.shortToLong;
  const shortCode = req.params.shortToLong;
  res.json({
    message: "From shortUrl to longUrl back",
    success: true,
    shortCode: shortCode,
  });
  // // Therefore, we have look on the Output as :-
  /**
   * Short Url Saved =>  {
  shortCode: 'qh4PePpaw',
  longUrl: 'https://t3.ftcdn.net/jpg/02/70/35/00/360_F_270350073_WO6yQAdptEnAhYKM5GuA9035wbRnVJSr.jpg',
  _id: new ObjectId('68c5712fa70952183c49aa3b'),
  __v: 0
}
   * 
   */
  // // Whereas, if we click on the Browser's shortUrl we are getting the Browser URL as :- (http://localhost:5000/qh4PePpaw)
  /**
   * {
  "message": "From shortUrl to longUrl back",
  "success": true,
  "shortCode": "qh4PePpaw"
}
   * 
   */
});

const PORT = 5000;

server.listen(PORT, () => {
  console.log(`Server Running at ${PORT}`);
});
