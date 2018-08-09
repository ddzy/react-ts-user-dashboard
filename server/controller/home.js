const koa = require('koa');
const Router = require('koa-router');

const home = new Router();



home.get('/', (ctx, next) => {
  ctx.body = '<h1>Hello home</h1>';
});

home.get('test', async (ctx, next) => {
  ctx.body = 'This is test auth';
})



module.exports = home;