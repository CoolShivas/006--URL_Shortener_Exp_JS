import express from "express";

const server = express();

server.get("/", (request, response) => {
  response.render("index.ejs");
});

const PORT = 5000;

server.listen(PORT, () => {
  console.log(`Server Running at ${PORT}`);
});
