/**
* @file api入口文件
*/

const Router = require('koa-router');
const url = require('url');


/**
 * 载入相关配置
 */
const env = require('../config/env.json');
const config = require(`../config/config.${env.env}.json`);
const intercept = require('../intercept.js');

const loginApi = require('./api/login');

let router = new Router();

router.use('/api/*', intercept.routes(), intercept.allowedMethod())
    .post('/api/login', loginApi.login)

    .get('/', index)


/*
*  注销
* @param {object} ctx 请求消息
*/
//  uuapconf 设置白名单和重定向的地址
async function logout(ctx) {
    delete ctx.session.views;
    ctx.cookies.set('username', null);
    let redirectUrl = url.format({
        pathname: '/logout',
        port: uuapConf.port,
        protocol: uuapConf.protocol,
        hostname: uuapConf.hostname,
        query: {
            service: url.format({
                protocol: ctx.protocol,
                host: ctx.host,
                hostname: ctx.hostname,
                port: ctx.port
            })
        }
    })
    console.log('************logout**************');
    ctx.body = {
        code: 302,
        redirectUrl
    }
}

/**
 * 页面请求
 *
 *  @param {Object} ctx ctx
 */
async function index(ctx) {
    await ctx.render('index');
    ctx.type = 'text/html; charset=utf-8';
}

module.exports = router;
