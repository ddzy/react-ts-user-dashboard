const Router = require('koa-router');
const models = require('../models/model');
const utils = require('../utils/util');
const jwt = require('jsonwebtoken');
const { SECRET, FILTER } = require('../constants/secret');

const login = new Router();
const Admin = models.getModel('admin');
const md5 = utils.md5;


login.post('/', async (ctx, next) => {
  let { adminname, adminpwd } = await ctx.request.body;
  adminpwd = md5(adminpwd); // 加密
  
  // 查询
  const result = await Admin.findOne({ adminname, adminpwd }, { ...FILTER });
  if(result) {
    ctx.body = {
      code: 0,
      data: result,
      token: jwt.sign({       // 生成 token
        data: { userid: result._id },
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
      }, SECRET),
    };
  }else {
    ctx.body = { code: 1, msg: '用户不存在!' };
  }
});




module.exports = login;