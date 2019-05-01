let router = require("express").Router();
let fs = require("fs");

// Import employee model
let employee = require("../models/employee");

// Multer middle ware - handle file-upload
// https://github.com/expressjs/multer
let multer = require("multer");
let storage = multer.diskStorage({
  destination: "tmp",
  filename: (req, file, cb) => {
    cb(null, `${req.body.password}.png`);
  }
});
let upload = multer({ storage }).single("avatar");

// Process login request
// If success render employee page
// If fail redirect to login page with error message
router.post("/login", (req, res) => {
  let { username, password } = req.body;
  employee.login(username, password, (err, data) => {
    if (err) res.sendStatus(500);
    if (data) res.render("emp", { employee: data });
    if (!data)
      res.render("login", { message: "Sai tên hoặc mật khẩu đăng nhập" });
  });
});

// Change avatar
// If request is authorized, server recieve image at tmp directory 
// Then move it to public/image
router.post("/avatar", upload, (req, res) => {
  let { username, password } = req.body;
  employee.login(username, password, (err, data) => {
    if (err) res.sendStatus(500);
    if (data) {
      fs.rename(req.file.path, `./public/image/${req.file.filename}`, err => {
        if (err) res.sendStatus(500);
        res.render("emp", { employee: data });
      });
    }
  });
});

// Change address
// Call employee model updater function to handle this
router.post("/address", (req, res) => {
  let { username, password, address } = req.body;
  employee.updater(username, password, { Dia_chi: address }, (err, data) => {
    if (err) res.sendStatus(500);
    if (data) res.render("emp", { employee: data });
  });
});

// Change phone number
// Call employee model updater function to handle this
router.post("/phone", (req, res) => {
  let { username, password, phoneNumber } = req.body;
  employee.updater(
    username,
    password,
    { Dien_thoai: phoneNumber },
    (err, data) => {
      if (err) res.sendStatus(500);
      if (data) res.render("emp", { employee: data });
    }
  );
});

module.exports = router;
