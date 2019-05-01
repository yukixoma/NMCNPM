// Employee model
// Use mongoose driver for MongoDB
// https://mongoosejs.com/
let mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

let { Schema, connect, model } = mongoose;

// Connect to database
connect(
  "mongodb://user:a123456@ds135796.mlab.com:35796/1788238",
  {
    useNewUrlParser: true
  }
);

// Declare employee model schema - employee model data structure
let employeeSchema = new Schema(
  {
    Ho_ten: String,
    Gioi_tinh: String,
    CMND: String,
    Ngay_sinh: Date,
    Muc_luong: Number,
    Dien_thoai: String,
    Email: String,
    Dia_chi: String,
    Don_vi: String,
    Ngoai_ngu: [String]
  },
  { collection: "employee" }
);

// Export employee model
let employee = (module.exports = model("employee", employeeSchema));

// Declare employee model functions
// Login function
employee.login = (username, password, callback) => {
  employee.findOne({ Email: username, CMND: password }).exec((err, data) => {
    if (err) return callback(err, null);
    else return callback(null, data);
  });
};

// Listing employee in one department
employee.listByDepartment = (department, callback) => {
  employee.find({ Don_vi: department }, (err, data) => {
    if (err) return callback(err, null);
    else return callback(null, data);
  });
};

// Employee language proficiency statistics
employee.flStat = (employees = []) => {
  let flStat = [];
  let fl = ["Anh", "Pháp", "Nga", "Đức", "Brasil"];
  fl.forEach(f => {
    let sum = 0;
    employees.forEach(e => {
      if (e.Ngoai_ngu.includes(f)) sum++;
    });
    let ratio = ((sum / employees.length) * 100).toFixed(2) + "%";
    flStat.push({
      language: f,
      quantity: sum,
      ratio: ratio
    });
  });
  return flStat;
};

// Employee by department in percent
employee.empStat = callback => {
  let stat = [];
  let dmp = ["A1", "A2", "B1", "B2", "B3", "B4"];
  employee.find({}, (err, data) => {
    if (err) return callback(err, null, null);
    else {
      let totalEmp = data.length;
      dmp.forEach(dp => {
        let quantity = data.filter(d => d.Don_vi == dp).length;
        let ratio = ((quantity / totalEmp) * 100).toFixed(2) + "%";
        stat.push({
          department: dp,
          quantity: quantity,
          ratio: ratio
        });
      });
      return callback(null, data, stat);
    }
  });
};

// Employee updater
// Update employee information if authorized (by login function)
employee.updater = (username, password, updateInfo = {}, callback) => {
  employee.login(username, password, (err, data) => {
    if (err) callback(err, null);
    if (data) {
      let propName = Object.keys(updateInfo);      
      for (let i = 0; i < propName.length; i++) {
        data[propName[i]] = updateInfo[propName[i]];        
      }      
      data.save(err => {
        if (err) return callback(err, null);
        return callback(null, data);
      });
    }
  });
};
