const Router = require('koa-router');
const jwt = require('jsonwebtoken');
const models = require('../models/model');
const utils = require('../utils/util');
const { SECRET, FILTER } = require('../constants/secret');

const register = new Router();
const Admin = models.getModel('admin');
const md5 = utils.md5;



register.post('/', async (ctx, next) => {
  const body = ctx.request.body;
  const admininfo = await Admin.findOne({ adminname: body.adminname }, FILTER);

  try {
    if(admininfo) {
      ctx.body = { code: 1, msg: '用户名已经存在!' };
    }else {
      const saveAdmin = await Admin.create({
        ...body,
        adminpwd: md5(body.adminpwd),
      });
      ctx.body = {
        code: 0,
        adminid: saveAdmin._id,
        adminname: saveAdmin.adminname,
        token: jwt.sign({
          data: { adminid: saveAdmin._id },
          exp: Math.floor(Date.now() / 1000) + (60 * 60),
        }, SECRET),
      };
    }
  } catch (error) {
    ctx.status = 401;
    ctx.body = { code: 1, msg: '后端出了点小问题,稍后再试吧!' };
  }
});


module.exports = register;