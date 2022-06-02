const request = require('supertest');
const server = require('./app.js');
const Product = require('./models/Product');

beforeAll(async ()=> {
    // console.log("testing begins")
})

afterAll(async ()=> {
    // console.log('all close');
    server.close();
})
describe('/api test',  ()=>{
    test('GET / should response 404',   async () => {
        const response = await request(server).get('/');
        expect(response.status).toEqual(404);
    })

    test('route GET /api should response 200', async ()=> {
        const response = await request(server).get('/api');
        expect(response.status).toBe(200);
        expect(response.text).toContain('Hello World');
    })
})

// test Products api route
jest.mock('./models/Product')
describe('/api/products route tests', ()=> {
    let products;
    beforeEach(() => {
        products = [
            {
                key: '1',
                code: '123',
                name: 'test',
                quantity: 1,
                price: 1,
                date: '2012-12-12'
            }
        ];
    });
    afterEach(()=> {
        products = [];
    })
    test("GET /api/products should pass", async ()=> {
        // const products = [
        //     {
        //         key: '1',
        //         code: '123',
        //         name: 'test',
        //         quantity: 1,
        //         price: 1,
        //         date: '2012-12-12'
        //     }
        // ]

        await Product.query.mockResolvedValue(products);

        const response = await request(server).get('/api/products');
        expect(response).toBeDefined();
        expect(response.body).toEqual(products);
    });

    // test("POST /api/products should fail", async ()=> {
    //     await Product.query.mockResolvedValue();
    //     const response = await request(server)
    //         .post('/api/products')
    //         .send({data: products})
    // })
})

