const request = require('supertest');
const createServer = require('../pre-setup');

const mongoose = require('mongoose')
// jest.mock('mongoose');

const Product = require('../models/Product');
jest.mock('../models/Product');

jest.mock('koa-jwt', () => {
    const fn = jest.fn((opts) => // 1st level i.e. jwt()
    {
        const middlewareMock = jest.fn(async (ctx, next) => { // 2nd level i.e. middleware()
            // Unreachable
        });
        // @ts-ignore
        middlewareMock.unless = jest.fn(() => jest.fn((ctx, next) => {
            next();
        })); // 4th level i.e. middleware().unless()
        return middlewareMock;
    });
    return fn;
});

let server;
beforeAll(()=>{
    server = createServer.listen(3002);
})

afterAll(()=>{
    mongoose.connection.close();
    server.close();
})

describe('/api test',  ()=>{
    test('GET / should response 404',async () => {
        const response = await request(server).get('/');
        expect(response.status).toEqual(404);
    })

    test('route GET /api should response 200', async ()=> {
        const response = await request(server).get('/api');
        expect(response.status).toBe(200);
        expect(response.text).toContain('Welcome to API page');
    })
})

// test Products api route
describe('/api/products route tests', ()=> {
    const products = [
        {
            _id: '1',
            code: '123',
            name: 'test',
            quantity: 1,
            price: 1,
            date: '2012-12-12'
        },
        {
            _id: '2',
            code: '111',
            name: 'test1',
            quantity: 12,
            price: 12,
            date: '2012-01-12'
        }
    ];

    afterEach(() => {
        jest.restoreAllMocks();
    })

    test("GET /api/products should pass", async ()=> {

        const queryMock = Product.find.mockReturnValue(products[0]);

        const response = await request(server).get('/api/products');
        // console.log(response);
        expect(response.body).toEqual(products[0]);
    });

    test("POST /api/products should pass", async ()=> {

        const response = await request(server).post('/api/products').send(products[1]);
        expect(Product.create).toBeCalled();
    });

    test('GET /api/products/id/:id', async ()=> {
        const queryMock = Product.findById.mockImplementation(id => products[0]);

        const response = await request(server).get('/api/products/id/2');
        // console.log(response.body)
        expect(Product.findById).toBeCalled();
        expect(response.body).toEqual(products[0]);
    });

    // GET by product code
    test("GET /api/products/code/:code", async () => {

        Product.find.mockResolvedValue(products[1]);

        const response = await request(server).get('/api/products/code/2');
        expect(response.body).toEqual(products[1]);
    });

    test("GET /api/products/name/:name", async ()=>{

        Product.findByName.mockImplementation(name => products[0])

        const response = await request(server).get('/api/products/name/test');
        // console.log(response)
        expect(response.body).toEqual(products[0])
        expect(Product.find).toBeCalled()
    });

    test("PATCH /products/code/2", async ()=>{

        const response = await request(server).patch('/api/products/code/2', products[1]);
        // console.log(response)
        expect(Product.findOneAndUpdate).toBeCalled()
    });

    test("DEL /products/id/:id", async () => {

        const response = await request(server).del('/api/products/id/1');
        expect(Product.deleteOne).toBeCalled()

    })

    test("DEL /products/code/:code", async () => {

        const response = await request(server).del('/api/products/code/123');
        expect(Product.deleteOne).toBeCalled()

    })

})