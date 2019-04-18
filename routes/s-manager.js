let router = require("express").Router();
let manager = require("../models/manager");
let employee = require("../models/employee");

router.post("/login", (req, res) => {
  let { username, password, title } = req.body;
  manager.login(username, password, title, (err, data) => {
    if (err) res.sendStatus(500);
    if (data) {
      employee.empStat((err, employees, stat) => {
        if (err) res.sendStatus(500);
        else res.render("s-mana", { employees, stat });
      });
    }
    if (!data)
      res.render("login", { message: "Sai tên hoặc mật khẩu đăng nhập" });
  });
});

module.exports = router;
