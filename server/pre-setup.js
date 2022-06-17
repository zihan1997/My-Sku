require('dotenv').config(__dirname + '/API/.env')
const Koa = require('koa');
const cors = require('koa2-cors');
const Router = require('koa-router');
const parser = require('koa-bodyparser');
const registerApi = require('./API/api');
const authApi = require('./API/auth');
const koaJwt = require('koa-jwt');
const unless = require('koa-unless')

// Server initial
const app = new Koa();

app.use(parser());
app.use(cors());

const router = new Router();
router.prefix('/api');
authApi(router);
registerApi(router);

app.use(function (ctx, next) {
    return next().catch((err) => {
        if(401 === err.status){
            ctx.status = 401;
            ctx.body = {
                code: 401,
                data: null,
                message: "invalid token"
            }
        }else{
            throw err;
        }
    })
});

app.use(koaJwt({
    secret: process.env.JWT_SCRETE
}).unless({
        path: ['/api/login', '/api/register']
    })
)

app.use(router.routes());
app.use(router.allowedMethods());

// mongoose
const mongoose = require('mongoose');
const mongo_uri = 'mongodb://myAppUser:myAppUserPwd@localhost:27017/my-app';
// const mongo_uri = process.env.MONGO_URI;
mongoose.connect(mongo_uri)

module.exports = app;