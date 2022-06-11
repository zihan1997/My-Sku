const Koa = require('koa');
const cors = require('koa2-cors');
const Router = require('koa-router');
const parser = require('koa-bodyparser');
const registerApi = require('./api')

// Server initial
const app = new Koa();

app.use(parser());
app.use(cors());

const router = new Router();
router.prefix('/api')
registerApi(router)

app.use(router.routes());
app.use(router.allowedMethods());

// mongoose
const mongoose = require('mongoose');
const mongo_uri = 'mongodb://myAppUser:myAppUserPwd@localhost:27017/my-app';
mongoose.connect(mongo_uri)

module.exports = app;