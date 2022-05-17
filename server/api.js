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

    /* get the full list of products */
    router.get('/products', async (ctx)=>{
        const query = Product.query();
        console.log(query)
        if(query){
            ctx.status = 200;
            ctx.type = 'json';
            ctx.body = await query;
        }else{
            ctx.status = 400;
        }
    });

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

        ctx.body = await Product.query().insert(ctx.request.body)
    })

    /* get exact product by id */
    router.get('/products/:key', async (ctx)=>{
        const query = await Product.query().findById(ctx.params.key);
        console.log(query)
        ctx.body = query;
    })

    /* update corresponding product
    *  assume what've been update here contains complete JSON data
    * */
    router.patch('/products/:key', async ctx => {
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