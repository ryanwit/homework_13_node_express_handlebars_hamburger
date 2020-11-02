// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm.js");

var cat = {
  // cat.all(cb callback)
  all: function(cb) {
    // calling orm.all(tableName, cb)
    orm.all("cats", function(res) {
      cb(res);
    });
  },
  // The variables cols and vals are arrays. //* cat.create([ "name", "sleepy"], ["Hendrix", "1"], cb)
  create: function(cols, vals, cb) {
    //* orm.create("cats", [ "name", "sleepy"], ["Hendrix", "1"], anotherCb)
    orm.create("cats", cols, vals, function(res) {
      cb(res);
    });
  },
  // cat.update({ sleepy: "false"}, "id = 5", cb )
  update: function(objColVals, condition, cb) {  //*objColVals = object of the column and value pairs
      //* orm.update("cats", { sleepy: "false"}, "id = 5", anotherCb )
    orm.update("cats", objColVals, condition, function(res) {
      cb(res);
    });
  },
  delete: function (condition, cb) {
    orm.delete("cats", condition, function (res) {
      cb(res);
    });
    
  }
};

// Export the database functions for the controller (catsController.js).
module.exports = cat;
