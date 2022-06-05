'use strict'
const Product = require('./models/Product');

module.exports = (router) => {
    /*
    * Get       products
    * Get       products/:key
    * Post      products
    * Delete    Products/:key
    *
    * */

    /* show a home page for api route  */
    router.get('/', async (ctx, res)=> {
        ctx.status=200;
        ctx.type='text/html'
        ctx.body = '<h1>Hello World</h1>'
    })

    /* get the full list of products */
    router.get('/products', async (ctx)=>{
        try{
            const query = Product.query();
            console.log("get products list")
            if (query) {
                ctx.status = 200;
                ctx.type = 'json';
                ctx.body = await query;
            } else {
                ctx.status = 400;
            }
        }catch (e){
            const msg = 'Internal error';
            ctx.status = e.statusCode || 500;
            ctx.body = {
                error: e.data || {msg}
            }
        }
    });

    /* get exact product by id */
    router.get('/products/:key', async (ctx)=>{
        try {
            const query = await Product.query().findById(ctx.params.key);
            console.log('get product by id ', ctx.params.key)
            ctx.body = query;
        }catch (e){
            const msg = 'Internal error';
            ctx.status = e.statusCode || 500;
            ctx.body = {
                error: e.data || {msg}
            }
        }
    })

    /*
    * Get the row by non-key cols
    *  */
    router.get('/products/code/:code', async ctx=>{
        let code = ctx.params.code;
        console.log("searching by code " + code);
        const query = Product.query().where({
            code: code
        });
        ctx.body = await query;
    })

    /*
    * fuzzy searching by name
    *  */
    router.get('/products/name/:name', async ctx=>{
        let name = ctx.params.name;
        console.log("searching by name " + name);
        const query = Product.query().orWhereRaw('name like ?', `%${name}%`);
        ctx.body = await query;
    })


    /* insert a new product
    *  assume redux has checked for type corrections
    * */
    router.post('/products', async ctx=>{
        /* for the purpose of inserting into other tables */

        // const insertedGraph = await Product.transaction(async trx => {
        //     const insertedGraph = await Product.query(trx)
        //         .insertGraph(ctx.request.body)
        //     return insertedGraph;
        // })
        // ctx.body = insertedGraph;

        try {
            console.log("create new product", ctx.request.body)
            ctx.body = await Product.query().insert(ctx.request.body)
        }catch (e){
            const msg = 'user: Internal error';
            ctx.status = e.statusCode || 500;
            ctx.body = {
                error: e.data || msg,
            }
        }
    })

    /* update corresponding product
    *  assume what've been update here contains complete JSON data
    * */
    router.patch('/products/:key', async ctx => {
        console.log("update product ", ctx.params.key);
        const data = ctx.request.body;
        const instance = await Product.query()
            .findById(ctx.params.key)
            .patch({
                code: data.code,
                name: data.name,
                quantity: data.quantity,
                price: data.price,
                date: data.date
            })

    })

    router.delete('/products/:key', async ctx => {
        const del = await Product.query().deleteById(ctx.params.key)
    })

}