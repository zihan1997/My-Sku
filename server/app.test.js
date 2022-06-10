const request = require('supertest');
const server = require('./pre-setup');
const { QueryBuilder } = require('objection')

jest.mock('./models/Product');
const Product = require('./models/Product');


describe('/api test',  ()=>{
    test('GET / should response 404',async () => {
        const response = await request(server.callback()).get('/');
        expect(response.status).toEqual(404);
    })

    test('route GET /api should response 200', async ()=> {
        const response = await request(server.callback()).get('/api');
        expect(response.status).toBe(200);
        expect(response.text).toContain('Hello World');
    })
})

// test Products api route
describe('/api/products route tests', ()=> {
    const products = [
        {
            key: '1',
            code: '123',
            name: 'test',
            quantity: 1,
            price: 1,
            date: '2012-12-12'
        },
        {
            key: '2',
            code: '111',
            name: 'test1',
            quantity: 12,
            price: 12,
            date: '2012-01-12'
        }
    ];

    test("GET /api/products should pass", async ()=> {
        const queryMock = jest
            .spyOn(Product, 'query')
            .mockImplementation(()=>
                QueryBuilder.forClass(Product).resolve(products)
            );

        const response = await request(server.callback()).get('/api/products');
        expect(queryMock).toBeCalled()
        expect(response).toBeDefined();
        expect(response.body).toEqual(products);

        queryMock.mockRestore()
    });

    test("POST /api/products should pass", async ()=> {
        const queryMock = jest
            .spyOn(Product, 'query')
            .mockImplementation(()=>
                QueryBuilder.forClass(Product).resolve(products[1])
                );

        const response = await request(server.callback()).post("/api/products")
            .set('Content-Type', 'application/json')
            .send({name: "test"});
        // console.log(response);
        expect(queryMock).toBeCalled();
        // expect(response.body).toEqual(products[0])

        queryMock.mockRestore()
    });

    test('GET /api/products/:key', async ()=> {
        const queryMock = jest
            .spyOn(Product, 'query')
            .mockImplementation(()=>
                QueryBuilder.forClass(Product).resolve(products[0])
            );

        const response = await request(server.callback()).get('/api/products/1');
        // console.log(response)
        expect(queryMock).toBeCalled();
        expect(response.body).toEqual(products[0]);

        queryMock.mockRestore()
    });

    // GET by product code
    test("GET /api/products/code/code_1", async () => {
        const queryMock = jest
            .spyOn(Product, 'query')
            .mockImplementation(()=>
                QueryBuilder.forClass(Product).resolve(products[0])
            );
        const response = await request(server.callback()).get('/api/products/code/1');
        expect(response.body).toEqual(products[0]);

        queryMock.mockRestore()
    });

    test("GET /api/products/name/name_1", async ()=>{
        const queryMock = jest
            .spyOn(Product, 'query')
            .mockImplementation(()=>
                QueryBuilder.forClass(Product).resolve(products[1])
            );
        const response = await request(server.callback()).get('/api/products/name/box');
        // console.log(response)
        expect(response.body).toEqual(products[1])

        queryMock.mockRestore()
    });

    test("PATCH /products/:key", async ()=>{
        const queryMock = jest
            .spyOn(Product, 'query')
            .mockImplementation((test)=>
                QueryBuilder.forClass(Product).resolve(test + " " + products[1])
            );
        const response = await request(server.callback()).patch('/api/products/1');
        expect(queryMock).toBeCalled()

        queryMock.mockRestore()
    });

    test("DEL /products/:key", async () => {
        const queryMock = jest
            .spyOn(Product, 'query')
            .mockImplementation((test)=>
                QueryBuilder.forClass(Product).resolve(test + " " + products[1])
            );
        const response = await request(server.callback()).del('/api/products/1');
        expect(queryMock).toBeCalled()

        queryMock.mockRestore()
    })

    describe("error while routering", () => {

        const errStr = 'Internal error';

        test('GET /products', async ()=> {
            const response = await request(server.callback()).get('/api/products');
            console.log(response.text)
            expect(response.status).toEqual(404);
        })

        test('GET /api/products/:key should fail', async ()=> {

            const response = await request(server.callback()).get('/api/products/1');
            // console.log(response)
            expect(response.text).toContain(errStr)
        });

        test("GET /products/code/:code", async () => {
            const response = await request(server.callback()).get('/api/products/code/1');
            expect(response.text).toContain(errStr);
        });
        test("GET /products/name/:name", async ()=> {
            const response = await request(server.callback()).get('/api/products/name/1');
            expect(response.text).toContain(errStr);
        })

        test("DEL /products/:key", async ()=>{
            const response = await request(server.callback()).del('/api/products/1');
            expect(response.text).toContain(errStr)
        })
    })
})

