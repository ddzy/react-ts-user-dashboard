const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(
  'mongodb://localhost:27017/react-user-dashboard-log',
  { useNewUrlParser: true }
);


/**
 * 模型
 *  admin: 管理员模型
 *  user: 用户模型
 */
const models = {
  admin: {
    adminname: { type: String, require: true },
    adminpwd: { type: String, require: true },
  },

  user: {
    username: { type: String, require: true },    // 姓名
    usergender: { type: String, require: true },  // 性别
    useremail: { type: String },    // 邮箱
    userjob: { type: String },      // 工作
    useraddress: { type: String },    // 住址
    create_time: { type: Number, default: new Date().getTime() },        // 新建用户时间
  },
};


for (const key in models) {
  if (models.hasOwnProperty(key)) {
    const value = models[key];
    mongoose.model(
      key,
      new mongoose.Schema(value)
    );
  }
}


module.exports = {
  getModel: function(modelName) {
    return mongoose.model(modelName);
  },
};