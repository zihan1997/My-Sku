'use strict'
const Product = require('./models/Product');

module.exports = (router) => {

    /* later Create new Product  */

    // router.post('/products', async (ctx)=> {
    //     const inseredGraph = await Product.transaction(async  (trx) => {
    //         const insertedGraph = await Product.query(trx)
    //             .allowGraph()
    //
    //     })
    // })

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

    /* get exact product by id */
    router.get('/products/:id', async (ctx)=>{
        const query = await Product.query().findById(ctx.params.id);
        console.log(query)
        ctx.body =  query;
    })
}