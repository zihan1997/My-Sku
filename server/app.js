const Koa = require('koa');
const cors = require('koa2-cors');
const serve = require("koa-static");
const Router = require('koa-router');
const parser = require('koa-bodyparser');
const registerApi = require('./api')

const app = new Koa();
app.use(parser());
app.use(cors());
const router = new Router();
registerApi(router)
app.use(router.routes());

const Knex = require('knex');
const knexConfig = require('./config');
const {Model} = require('objection');
const knex = Knex(knexConfig)
Model.knex(knex);

const port = 3001;
app.listen(port);
console.log("Server running at port " + port)