let express = require("express");
let bodyParser = require("body-parser");
let path = require("path");

let employee = require("./routes/employee");
let manager = require("./routes/manager");
let sManager = require("./routes/s-manager");

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "pug");

//serve static folder
app.use("/js", express.static(path.join(__dirname, "public", "js")));
app.use("/css", express.static(path.join(__dirname, "public", "css")));
app.use("/img", express.static(path.join(__dirname, "public", "image")));

app.get("/", (req, res) => {
  res.render("login", { message: null });
});

app.post("/login", (req, res) => {
  let { title } = req.body;
  if (title == "employee") res.redirect(307, "employee/login");
  if (title == "manager") res.redirect(307, "manager/login");
  if (title == "s-manager") res.redirect(307, "s-manager/login");
});

app.use("/employee", employee);
app.use("/manager", manager);
app.use("/s-manager", sManager);

let port = 3000 || process.env.PORT;
app.listen(port, () => console.log(`App is listening at ${port}`));
