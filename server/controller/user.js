const Router = require('koa-router');
const models = require('../models/model');
const utils = require('../utils/util');
const { SECRET } = require('../constants/secret');

const user = new Router();
const User = models.getModel('user');
const md5 = utils.md5;



// 初始化用户列表
user.post('/userlist', async (ctx, next) => {
  const { page, pageSize } = ctx.request.body;
  const total = await User.find({});
  const result = await User.find({})
    .sort({ 'create_time': -1  })
    .skip((page - 1) * pageSize)
    .limit(pageSize);

  ctx.body = {
    code: 0,
    data: {
      result: result || [],
      total: total.length,
    },
  };
});


// 新增用户
user.post('/add', async (ctx, next) => {
  const result = await User.create(ctx.request.body);
  if(result) {
    ctx.body = {
      code: 0,
      data: result,
    };
  }else {
    ctx.body = {
      code: 1,
      msg: '后端出错了!',
    };
  }
});


// 删除用户
user.post('/remove', async (ctx, next) => {
  const result = await User.findByIdAndRemove({ '_id': ctx.request.body.id });
  if(result) {
    ctx.body = {
      code: 0,
      data: result,
    };
  }
});

module.exports = user;