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

// DB Manage
const Knex = require('knex');
const knexConfig = require('./config');
const {Model} = require('objection');
const knex = Knex(knexConfig)
Model.knex(knex);

const port = process.env.KOA_PORT;
app.listen(port);
console.log("Server running at port " + port)