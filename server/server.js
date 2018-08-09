const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const jwt = require('koa-jwt');
const { SECRET } = require('./constants/secret');

const app = new Koa();
const router = new Router();



app.use(bodyParser());

// 自定义 token 拦截
app.use(async (ctx, next) => {
  return next().catch((err) => {
    if(err.status === 401) {
      ctx.status = 401;
      console.log(111);
      ctx.body = '没有访问权限, 请登陆后在试!'
    }else {
      throw err;
    }
  });
});

app.use(jwt({ secret: SECRET }).unless({
  path: [/^\/login/, /^\/register/],
}))




// 子路由
const homeController = require('./controller/home');
const userController = require('./controller/user');
const loginController = require('./controller/login');
const registerController = require('./controller/register');



// 装载路由
router
  .use('/', homeController.routes(), homeController.allowedMethods())
  .use('/user', userController.routes(), userController.allowedMethods())
  .use('/login', loginController.routes(), loginController.allowedMethods())
  .use('/register', registerController.routes(), registerController.allowedMethods())



// 加载路由中间件
app
  .use(router.routes())
  .use(router.allowedMethods());


app.listen(8888);
  