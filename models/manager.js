// Employee model
// Use mongoose driver for MongoDB
// https://mongoosejs.com/
let mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

let { Schema, connect, model } = mongoose;

// Connect to database
connect(
  "mongodb://user:a123456@ds135796.mlab.com:35796/1788238",
  {
    useNewUrlParser: true
  }
);

// Declare manager model schema - manager model data structure
let managerSchema = new Schema(
  {
    username: String,
    password: String,
    title: String,
    department: String
  },
  { collection: "manager" }
);

// Export manager model
let manager = (module.exports = model("manager", managerSchema));

// Manager model login function
manager.login = (username, password, title, callback) => {
  manager
    .findOne({ username: username, password: password, title: title })
    .exec((err, data) => {
      if (err) return callback(err, null);
      else return callback(null, data);
    });
};
