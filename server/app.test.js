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
    let products = [
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

    beforeEach(() => {

    });
    afterEach(()=> {
        // jest.clearAllMocks();
    });



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
    });

    test('GET /api/products/Some_product', async ()=> {
        const queryMock = jest
            .spyOn(Product, 'query')
            .mockImplementation(()=>
                QueryBuilder.forClass(Product).resolve(products[0])
            );

        const response = await request(server.callback()).get('/api/products/1');
        // console.log(response)
        expect(queryMock).toBeCalled();
        expect(response.body).toEqual(products[0]);
    })

    // GET by product code
    test("GET /api/products/code/code_1", async () => {
        const queryMock = jest
            .spyOn(Product, 'query')
            .mockImplementation(()=>
                QueryBuilder.forClass(Product).resolve(products[0])
            );
        const response = await request(server.callback()).get('/api/products/code/1');
        expect(response.body).toEqual(products[0]);
    });

    test("GET /api/products/name/name_1", async ()=>{
        const queryMock = jest
            .spyOn(Product, 'query')
            .mockImplementation(()=>
                QueryBuilder.forClass(Product).resolve(products[1])
            );
        const response = await request(server.callback()).get('/api/products/name/box');
        console.log(response)
        expect(response.body).toEqual(products[1])
    });

    test("PATCH /products/:key", async ()=>{
        const queryMock = jest
            .spyOn(Product, 'query')
            .mockImplementation((test)=>
                QueryBuilder.forClass(Product).resolve(test + " " + products[1])
            );
        const response = await request(server.callback()).patch('/api/products/1');
        expect(queryMock).toBeCalled()
    });

    test("DEL /products/:key", async () => {
        const queryMock = jest
            .spyOn(Product, 'query')
            .mockImplementation((test)=>
                QueryBuilder.forClass(Product).resolve(test + " " + products[1])
            );
        const response = await request(server.callback()).del('/api/products/1');
        expect(queryMock).toBeCalled()
    })
})

