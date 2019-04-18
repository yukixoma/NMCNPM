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

app.get("/test", (req, res) => {
  let data = {
    Ho_ten: "Võ quyết Ngoạn",
    Gioi_tinh: "Nam",
    CMND: "040870538",
    Ngay_sinh: new Date("1984-07-02T17:00:00.000Z"),
    Muc_luong: 7950000,
    Dien_thoai: "0964389900",
    Email: "voquyetngoan@gmail.com",
    Dia_chi:
      "322 Bạch lâm Toàn,Phường 1,Quận 9, Ho Chi Minh City, Ho Chi Minh, Vietnam",
    Don_vi: "A1",
    Ngoai_ngu: ["Anh", "Nga", "Đức", "Pháp"]
  };
  res.render("emp", { employee: data });
});

app.use("/employee", employee);
app.use("/manager", manager);
app.use("/s-manager", sManager);

let port = 3000 || process.env.PORT;
app.listen(port, () => console.log(`App is listening at ${port}`));
