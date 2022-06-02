const request = require('supertest');
const server = require('./app.js');

beforeAll(async ()=> {
    console.log("testing begins")
})

afterAll(async ()=> {
    console.log('all close');
    server.close();
})
describe('/api test',  ()=>{
    test('It should response 404 to the GET method',   async () => {
        const response = await request(server).get('/');
        expect(response.status).toEqual(404);
    })

    test('get api home route GET /api', async ()=> {
        const response = await request(server).get('/api');
        expect(response.status).toBe(200);
        expect(response.text).toContain('Hello World');
    })
})

describe('/api/products route tests', ()=> {
    test('GET /products', async ()=> {
        const response = request(server).get('/api/products');
        console.log(response);
    })
})

