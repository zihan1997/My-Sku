// 'use strict'
const Product = require('./models/Product');


module.exports = (router) => {
    /*
    * Get       products
    * Get       products/:key
    * Post      products
    * Delete    Products/:key
    *
    * */
    const debug = true;
    /* show a home page for api route  */
    router.get('/', async (ctx, res)=> {
        ctx.status=200;
        ctx.type='text/html'
        ctx.body = '<h1>Welcome to API page</h1>'
    })

    /**
     * query: [id, code, name]
     * get a list of products */
    router.get('/products', async (ctx)=>{
        ctx.body = await Product.find();

    });

    /* get exact product by id */
    router.get('/products/id/:id', async (ctx)=>{
        try {
            const id = ctx.params.id;
            const query = await Product.findById(id);
            if(debug) console.log('get product by id ', ctx.params.key)
            ctx.body = query;
            ctx.status = 200
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
        if(debug) console.log("searching by code " + code);
        try{
            ctx.body = await Product.find({code: code});
            ctx.status = 200;
        }catch (e){
            const msg = 'Internal error';
            ctx.status = e.statusCode || 500;
            ctx.body = {
                error: e.data || {msg}
            }
        }
    })

    /*
    * fuzzy searching by name
    *  */
    router.get('/products/name/:name', async ctx=>{
        let name = ctx.params.name;
        if(debug) console.log("searching by name " + name);
        try {
            // const query = Product.query().orWhereRaw('name like ?', `%${name}%`);
            ctx.body = await Product.findByName(name);
            ctx.status = 200;
        }catch (e){
            const msg = 'Internal error';
            ctx.status = e.statusCode || 500;
            ctx.body = {
                error: e.data || {msg}
            }
        }
    })


    /* insert a new product
    *  assume redux has checked for type corrections
    * */
    router.post('/products', async ctx=>{

        try {
            if(debug) console.log("create new product", ctx.request.body)
            ctx.body = await Product.create(ctx.request.body);
            ctx.status = 200;
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
    router.patch('/products/:id', async ctx => {
        if(debug) console.log("update product ", ctx.params.id);
        const data = ctx.request.body;
        console.log(data);
        try {
            const instance = await Product.findOneAndUpdate({ code: data.code},data);
            ctx.status = 200;
        }catch (e) {
            const msg = 'user: Internal error';
            ctx.status = e.statusCode || 500;
            ctx.body = {
                error: e.data || msg,
            }
        }
    })

    router.delete('/products/:id', async ctx => {
        try {
            await Product.deleteOne({_id: ctx.params.id})
            ctx.status = 200;
        }catch (e){
            const msg = 'user: Internal error';
            ctx.status = e.statusCode || 500;
            ctx.body = {
                error: e.data || msg,
            }
        }

    })

}