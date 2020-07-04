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

//post function for processing payments

router.post("/purchase", function (req, res) {
  fs.readFile("items.json", function (error, data) {
    if (error) {
      res.status(500).end();
    } else {
      //parse items sent from cart
      const itemsJson = JSON.parse(data);
      const itemsArray = itemsJson.music.concat(itemsJson.merch);
      //calculate total for cart
      let total = 0;
      console.log("Total being calculated");
      req.body.items.forEach(function (item) {
        const foundItem = itemsArray.find(function (i) {
          return i.id == item.id;
        });
        total = total + foundItem.price * item.quantity;
      });
      //Create new Stripe charge
      stripe.charges
        .create({
          amount: total,
          source: req.body.stripeTokenId,
          currency: "usd",
        })
        .then(function () {
          console.log("Charge Succesful");
          res.json({ message: "Succesfully Purchased Items" });
        })
        .catch(function () {
          console.log("Charge Failed");
          res.status(500).end();
        });
    }
  });
});

app.use("/", router);
app.listen(port);
console.log("Server Running at Port " + port + "...");
