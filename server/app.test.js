const request = require('supertest');
const createServer = require('./pre-setup');

const mongoose = require('mongoose')
// jest.mock('mongoose');

const Product = require('./models/Product');
jest.mock('./models/Product');

var server;
beforeAll(()=>{
    server = createServer.listen(3001);
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

    test.only('GET /api/products/id/:id', async ()=> {
        const queryMock = Product.findById.mockResolvedValue(Product[0]);

        const response = await request(server).get('/api/products/id/2');
        console.log(response)
        expect(response.body).toEqual(products[1]);
    });

//     // GET by product code
//     test("GET /api/products/code/code_1", async () => {
//         const queryMock = jest
//             .spyOn(Product, 'query')
//             .mockImplementation(()=>
//                 QueryBuilder.forClass(Product).resolve(products[0])
//             );
//         const response = await request(server.callback()).get('/api/products/code/1');
//         expect(response.body).toEqual(products[0]);
//
//         queryMock.mockRestore()
//     });
//
//     test("GET /api/products/name/name_1", async ()=>{
//         const queryMock = jest
//             .spyOn(Product, 'query')
//             .mockImplementation(()=>
//                 QueryBuilder.forClass(Product).resolve(products[1])
//             );
//         const response = await request(server.callback()).get('/api/products/name/box');
//         // console.log(response)
//         expect(response.body).toEqual(products[1])
//
//         queryMock.mockRestore()
//     });
//
//     test("PATCH /products/:key", async ()=>{
//         const queryMock = jest
//             .spyOn(Product, 'query')
//             .mockImplementation((test)=>
//                 QueryBuilder.forClass(Product).resolve(test + " " + products[1])
//             );
//         const response = await request(server.callback()).patch('/api/products/1');
//         expect(queryMock).toBeCalled()
//
//         queryMock.mockRestore()
//     });
//
//     test("DEL /products/:key", async () => {
//         const queryMock = jest
//             .spyOn(Product, 'query')
//             .mockImplementation((test)=>
//                 QueryBuilder.forClass(Product).resolve(test + " " + products[1])
//             );
//         const response = await request(server.callback()).del('/api/products/1');
//         expect(queryMock).toBeCalled()
//
//         queryMock.mockRestore()
//     })
//
//     describe("error while routering", () => {
//
//         const errStr = 'Internal error';
//
//         test('GET /products', async ()=> {
//             const response = await request(server.callback()).get('/api/products');
//             console.log(response.text)
//             expect(response.status).toEqual(404);
//         })
//
//         test('GET /api/products/:key should fail', async ()=> {
//
//             const response = await request(server.callback()).get('/api/products/1');
//             // console.log(response)
//             expect(response.text).toContain(errStr)
//         });
//
//         test("GET /products/code/:code", async () => {
//             const response = await request(server.callback()).get('/api/products/code/1');
//             expect(response.text).toContain(errStr);
//         });
//         test("GET /products/name/:name", async ()=> {
//             const response = await request(server.callback()).get('/api/products/name/1');
//             expect(response.text).toContain(errStr);
//         })
//
//         test("DEL /products/:key", async ()=>{
//             const response = await request(server.callback()).del('/api/products/1');
//             expect(response.text).toContain(errStr)
//         })
//     })
})

