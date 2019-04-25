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
            username: username,
            password: password,
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

router.get("/:username/:password/:empCMND", (req, res) => {
  let { username, password, empCMND } = req.params;
  manager.login(username, password, "manager", (err, mdata) => {
    if (err) res.sendStatus(500);
    if (mdata) {
      employee
        .findOne({ CMND: empCMND, Don_vi: mdata.department })
        .exec((err, edata) => {
          if (err) res.sendStatus(500);
          if (edata) res.render("emp", { employee: edata });
        });
    }    
  });
});

module.exports = router;
