//Verify Environment
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: ".env" });
}

const fs = require("fs");
const express = require("express");

//Keys for processing payments with stripe
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY;
const stripe = require("stripe")(stripeSecretKey);

//Configure app
const app = express();
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.static("public"));

//get function to show store page
app.get("/store", function (req, res) {
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

console.log("Server Running...");
app.listen(3000);
