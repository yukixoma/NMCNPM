let router = require("express").Router();

// Import manager and employee model
let manager = require("../models/manager");
let employee = require("../models/employee");

// Process login request
// If success render manager (Quản lí đơn vị) page
// If fail redirect to login page with error message
router.post("/login", (req, res) => {
  let { username, password, title } = req.body;
  manager.login(username, password, title, (err, data) => {
    if (err) res.sendStatus(500);
    if (data) {
      employee.empStat((err, employees, stat) => {
        if (err) res.sendStatus(500);
        else res.render("s-mana", { username, password, employees, stat });
      });
    }
    if (!data)
      res.render("login", { message: "Sai tên hoặc mật khẩu đăng nhập" });
  });
});

// Employee detailed infomation view
// If request is authorized, render employee information view page
router.get("/:username/:password/:empCMND", (req, res) => {
  let { username, password, empCMND } = req.params;
  manager.login(username, password, "s-manager", (err, mdata) => {
    if (err) res.sendStatus(500);
    if (mdata) {
      employee.findOne({ CMND: empCMND }, (err, edata) => {
        if (err) res.sendStatus(500);
        if (edata) res.render("empView", { employee: edata });
      });
    }
  });
});

module.exports = router;
