const request = require('supertest');
const server = require('./app.js');

jest.mock('./models/Product');
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

        Product.query.mockResolvedValue(products);

        const response = await request(server).get('/api/products');
        expect(response).toBeDefined();
        expect(response.body).toEqual(products);
    });

    test("POST /api/products should pass", async ()=> {
        let addOne = {
            code: '111',
            name: 'test1',
            quantity: 12,
            price: 12,
            date: '2012-01-12'
        }

        const response = await request(server).post("/api/products").send(addOne);
        // console.log(response);
        expect(response.status).toBe(500);
        expect(response.body.data).toEqual(addOne);
    })
})

