/**
 *
 * @file 请求拦截
 *
 */

 const Router = require('koa-router');
 const router = new Router();
 const url = require('url');

 const env = require('./config/env.json');
 const config = require(`./config/config.${env.env}.json`);
 const db = config.mongo.db;
 const user = config.collections.user;

 const EXPRESSTIME = '3h';

 function relogin (ctx) {
     ctx.body = {
         code: 302,
         redirectUrl: ctx.headers.referer + 'login',
         message: '请重新登录'
     }
 }

 router.all('*', async (ctx, next) => {
    let token = ctx.headers.authorization;
    let searchUrl = ctx.url;
    if (searchUrl.includes('/getCode') || searchUrl.includes('/queryUser') || searchUrl.includes('/register') || searchUrl.includes('/getList') || searchUrl.includes('/login') || searchUrl.includes('/updateImg')) {
        await next();
    } else if (!token || nowTime > expriesTime) {
        relogin(ctx);
    } else {
        await next();
    }
 })

 module.exports = router;
