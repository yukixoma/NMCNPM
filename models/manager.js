let { Schema, connect, model } = require("mongoose");

connect(
  "mongodb://user:a123456@ds135796.mlab.com:35796/1788238",
  {
    useNewUrlParser: true
  }
);

let managerSchema = new Schema(
  {
    username: String,
    password: String,
    title: String,
    department: String
  },
  { collection: "manager" }
);

let manager = (module.exports = model("manager", managerSchema));

manager.login = (username, password, title, callback) => {
  manager
    .findOne({ username: username, password: password, title: title })
    .exec((err, data) => {
      if (err) return callback(err, null);
      else return callback(null, data);
    });
};
