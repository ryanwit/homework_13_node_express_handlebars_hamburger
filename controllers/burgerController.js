var express = require("express");

var router = express.Router();

// Import the model (cat.js) to use its database functions.
var burger = require("../models/burger.js");

// Create all our routes and set up logic within those routes where required. //*cat.all is pointing to our model directory 
router.get("/", function(req, res) {
  // cat.all(cb callback)
  burger.all(function(data) {  
    res.render("index", { cats: data });  //got rid of hbsObject
  });
});

// POST /api/cats
router.post("/api/cats", function(req, res) {
    //* { name: "Hendrix", sleepy: "1" }

    //* cat.create([ "name", "sleepy"], ["Hendrix", "1"], cb)
  cat.create([
    "name", "sleepy"
  ], [
    req.body.name, req.body.sleepy
  ], function(result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});
  // /api/cats/5 PUT { sleepy: "false" }
router.put("/api/cats/:id", function(req, res) {
  // "id = 5"
  var condition = "id = " + req.params.id;

  // Send the PUT request
  // cat.update({ sleepy: "false"}, "id = 5", cb )
  cat.update({
    sleepy: req.body.sleepy
  }, condition, function(result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

// Export routes for server.js to use.
module.exports = router;
