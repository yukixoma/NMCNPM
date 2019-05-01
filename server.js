let express = require("express");
let bodyParser = require("body-parser");
let path = require("path");

let app = express();

// Set render engine - Pug
app.set("view engine", "pug");

//serve static folder
app.use("/js", express.static(path.join(__dirname, "public", "js")));
app.use("/css", express.static(path.join(__dirname, "public", "css")));
app.use("/img", express.static(path.join(__dirname, "public", "image")));

// Body parser middleware - parse incoming request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Home page - Login page
app.get("/", (req, res) => {
  res.render("login", { message: null });
});

// Receive login data
app.post("/login", (req, res) => {
  let { title } = req.body;
  if (title == "employee") res.redirect(307, "employee/login");
  if (title == "manager") res.redirect(307, "manager/login");
  if (title == "s-manager") res.redirect(307, "s-manager/login");
});

// Create routes
// Employee route
let employee = require("./routes/employee");
app.use("/employee", employee);
// Manager (Quản lí đơn vị) route
let manager = require("./routes/manager");
app.use("/manager", manager);
//  s-manager (Quản lí chi nhánh) route 
let sManager = require("./routes/s-manager");
app.use("/s-manager", sManager);

// App listen port - 3000 for default
let port = 3000 || process.env.PORT;
app.listen(port, () => console.log(`App is listening at ${port}`));
