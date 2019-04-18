let router = require("express").Router();
let employee = require("../models/employee");

router.post("/login", (req, res) => {
  let { username, password } = req.body;
  employee.login(username, password, (err, data) => {
    if (err) res.sendStatus(500);
    if (data) res.render("emp", { employee: data });
    if (!data)
      res.render("login", { message: "Sai tên hoặc mật khẩu đăng nhập" });
  });
});

module.exports = router;
