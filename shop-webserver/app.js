const Koa = require('koa');
const path = require('path');
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');
const mongo = require('koa-mongo');
const morgan = require('koa-morgan');
const koaBody = require('koa-body');
const moment = require('moment');
const assets = require('koa-static');

/**
 * 载入配置
 */
const env = require('./config/env.json');
const config = require(`./config/config.${env.env}.json`);
const mongoConf = config.mongo;

const app = new Koa();
const staticPath = '/web';

// session config
const SESSION_CONFIG = {
    key: 'SessionId',
    maxAge: 7200000  // 2h
}

// session加密字符串
app.keys = ['some secret key'];
// 数据库连接
app.use(mongo(mongoConf));
// logger日志打印（开发）
app.use(logger());
// 访问日志写入
if (env !== 'production') {
    app.use(morgan('dev'))
} else {
    const filename = path.join(__dirname, 'logs', 'assess.log');
    const writeStream = fs.createWriteStream(filename);
    app.use(morgan('combined', {
        stream: writeStream
    }))
}

// post的body处理
app.use(koaBody());
// 静态文件访问
app.use(assets(__dirname + staticPath));
// session中间件
app.use(router.routes());
// 记录每个中间件响应的时间
app.use(async (ctx, next) => {
    await next();
    const rt = ctx.response.get('X-Response-Time');
    const now = moment().format('YYYY-MM-DD HH:mm:ss');
    console.log(`${ctx.method} ${ctx.url} - ${rt} ${now}`);
})

app.listen(config.port);
// 服务器启动完成
console.log("服务器启动成功..." + 'port:' + config.port);
