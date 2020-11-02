// Import MySQL connection.
var connection = require("../config/connection.js");


// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
    // { sleepy: "false"} 
  var arr = []; // [] empty array

  // loop through the keys and push the key/value as a string int arr
  for (var key in ob) {
    var value = ob[key]; // false
    // check to skip hidden properties  // hasOwnProperty?
    if (Object.hasOwnProperty.call(ob, key)) {
      // "false" 
      // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
      // e.g. {sleepy: true} => ["sleepy=true"]
      arr.push(key + "=" + value);
    }
  }

  // translate array of strings to a single comma-separated string
  return arr.toString();
}

// Object for all our SQL statement functions.
var orm = {
  // calling orm.all(tableName, cb)
  // orm.all("cats, function(){}")
  all: function(tableInput, cb) {
    // SELECT * FROM cats
    var queryString = "SELECT * FROM " + tableInput + ";";
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      // cb(dataFromSelectQuery)
      cb(result);
    });
  },
  //* orm.create("cats", [ "name", "sleepy"], ["Hendrix", "1"], anotherCb)
  create: function(table, cols, vals, cb) {
      //*INSERT INTO cats (name,sleepy) VALUES (?,?) - this is what everything below will make
    var queryString = "INSERT INTO " + table;

    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += printQuestionMarks(vals.length); //! ?,?
    queryString += ") ";

    //*INSERT INTO cats (name,sleepy) VALUES (?,?)
    // ["Hendrix", "1"]
    connection.query(queryString, vals, function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },
  // An example of objColVals would be {name: panther, sleepy: true} - object column value pairings
  // orm.update("cats", {sleepy: "false"}, "id = 5", anotherCb)
  update: function(table, objColVals, condition, cb) {
      //UPDATE cats SET sleepy = false WHERE id = 5
    var queryString = "UPDATE " + table;

    queryString += " SET ";
    queryString += objToSql(objColVals);
    queryString += " WHERE ";
    queryString += condition;

    console.log(queryString);
      //UPDATE cats SET sleepy = false WHERE id = 5
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  }
};

// Export the orm object for the model (cat.js).
module.exports = orm;
