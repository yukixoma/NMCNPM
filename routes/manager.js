let router = require("express").Router();
let manager = require("../models/manager");
let employee = require("../models/employee");

router.post("/login", (req, res) => {
  let { username, password, title } = req.body;
  manager.login(username, password, title, (err, data) => {
    if (err) res.sendStatus(500);
    if (data) {
      let { department } = data;
      employee.listByDepartment(department, (err, data) => {
        if (err) res.sendStatus(500);
        if (data) {
          let flStat = employee.flStat(data);
          res.render("mana", {
            department: department,
            employees: data,
            flStat: flStat
          });
        }
      });
    }
    if (!data)
      res.render("login", { message: "Sai tên hoặc mật khẩu đăng nhập" });
  });
});

module.exports = router;
