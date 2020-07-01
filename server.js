//Verify Environment
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: ".env" });
}
let port = 3000;
const fs = require("fs");
const express = require("express");
const path = require("path");

//Keys for processing payments with stripe
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY;
const stripe = require("stripe")(stripeSecretKey);

//Configure app
const app = express();
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.static("public"));
const router = express.Router();

//get function for store page
router.get("/store", function (req, res) {
  fs.readFile("items.json", function (error, data) {
    if (error) {
      res.status(500).end();
    } else {
      res.render("store.ejs", {
        stripePublicKey: stripePublicKey,
        items: JSON.parse(data),
      });
    }
  });
});

//get function for index page
router.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

//get function for about page
router.get("/about", function (req, res) {
  res.sendFile(path.join(__dirname + "/public/about.html"));
});

app.use("/", router);
app.listen(port);
console.log("Server Running at Port " + port + "...");
