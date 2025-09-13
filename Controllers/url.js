import { Url } from "../Models/Url.js";
import shortid from "shortid";

export const shortUrlFunc = async (request, response) => {
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
};

export const getOriginalUrlFunc = async (req, res) => {
  // // Using params to get the dynamic shortCode after slash in url;
  // // And, while using params we have to take the dynamic route i.e,(/:shortToLong) as req.params.shortToLong;
  const shortCode = req.params.shortToLong;
  //   res.json({
  //     message: "From shortUrl to longUrl back",
  //     success: true,
  //     shortCode: shortCode,
  //   });
  //   // // Therefore, have a look on the Output as :-
  //   /**
  //    * Short Url Saved =>  {
  //   shortCode: 'qh4PePpaw',
  //   longUrl: 'https://t3.ftcdn.net/jpg/02/70/35/00/360_F_270350073_WO6yQAdptEnAhYKM5GuA9035wbRnVJSr.jpg',
  //   _id: new ObjectId('68c5712fa70952183c49aa3b'),
  //   __v: 0
  // }
  //    *
  //    */
  //   // // Whereas, if we click on the Browser's shortUrl we are getting the Browser URL as :- (http://localhost:5000/qh4PePpaw)
  //   /**
  //    * {
  //   "message": "From shortUrl to longUrl back",
  //   "success": true,
  //   "shortCode": "qh4PePpaw"
  // }
  //    *
  //    */

  // // // // Finding the shortUrl which matches it's exact longUrl;
  const originalUrl = await Url.findOne({ shortCode });

  //   res.json({ originalUrl });
  //   // // Therefore, have a look on the Output as :-
  //   /**
  //    * Short Url Saved =>  {
  //   shortCode: 'pADvjHiV6',
  //   longUrl: 'https://5.imimg.com/data5/SELLER/Default/2021/1/NJ/GN/AS/75393646/3d-waterfall-nature-wallpaper.jpg',
  //   _id: new ObjectId('68c573ab01baa07daa16d5ea'),
  //   __v: 0
  // }
  //    */
  //   // // Whereas, if we click on the Browser's shortUrl we are getting the Browser URL as :- (http://localhost:5000/pADvjHiV6)
  //   /**
  //    * {
  //   "originalUrl": {
  //     "_id": "68c573ab01baa07daa16d5ea",
  //     "shortCode": "pADvjHiV6",
  //     "longUrl": "https://5.imimg.com/data5/SELLER/Default/2021/1/NJ/GN/AS/75393646/3d-waterfall-nature-wallpaper.jpg",
  //     "__v": 0
  //   }
  // }
  //    *
  //    */

  // // // // Now, we can use the if/else statement;
  if (originalUrl) {
    res.redirect(originalUrl.longUrl);
  } else {
    res.json({ message: "Invalid short code" });
  }
  // // // // Finally, we are getting the Output on clicking the shortUrl of Browser's and it redirect to original url;
};
