//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dates = require(__dirname + "/dates.js");

const app = express();

app.set("view engine", "ejs");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.static(__dirname + "/public"));

mongoose.connect("mongodb://localhost:27017/todolistDB", {
  useNewUrlParser: true,
});

const itemsSchema = new mongoose.Schema({
  itemName: String,
});

const personalItems = mongoose.model("personalItem", itemsSchema);

const personalItem_1 = new personalItems({ itemName: "Buy Groceries" });
const personalItem_2 = new personalItems({ itemName: "Set Alarm" });
const personalItem_3 = new personalItems({
  itemName: "Note down Today's Learning Target ",
});

const defaultItems = [personalItem_1, personalItem_2, personalItem_3];

// let PersonalItems = ["Buy Food"];

let workItems = [];

app.get("/", function (req, res) {
  const longDate = dates.getLongDate();

  personalItems.find({}, function (err, personalItemsFound) {
    if (personalItemsFound === 0) {
      personalItems.insertMany(defaultItems, function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log(
            "Successfully saved default items in to personal items collection of database."
          );
        }
      });
    } else if (err) {
      console.log(err);
    } else {
      console.log(personalItemsFound);

      res.render("list", {
        listTitle: "Personal Items",
        date: longDate,
        newListItems: personalItemsFound,
      });
    }
  });
});

app.post("/", function (req, res) {
  const item = req.body.newItem;
  const newItem = new personalItems({ itemName: item });

  const listType = req.body.list;

  if (listType === "Work List") {
    workItems.push(item);
    console.log("The post request is : " + item);
    console.log(req.body);
    res.redirect("/work");
  } else {
    // PersonalItems.push(item);

    // newItem.save();

    personalItems.create(newItem, function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log(
          "Successfully saved new item in to personal items collection of database."
        );
      }
    });

    console.log("The post request is : " + item);
    console.log(req.body);
    res.redirect("/");
  }
});

app.get("/work", function (req, res) {
  const shortDate = dates.getShortDate();

  res.render("list", {
    listTitle: "Work List",
    date: shortDate,
    newListItems: workItems,
  });
});

app.post("/", function (req, res) {
  let workItem = req.body.newItem;
  workItem.push(workItem);

  res.redirect("/");
});

app.listen(3000, function () {
  console.log("Server is started on port:3000");
});
