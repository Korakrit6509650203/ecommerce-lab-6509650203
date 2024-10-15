const request = require('supertest');
const app = require('../app');
describe('Product API Tests', () => {
//GET /products
	it('should return all products', async () => {
		const res = await request(app).get('/products');
		expect(res.statusCode).toBe(200);
		const firstProduct = res.body[0];
		expect(firstProduct).toHaveProperty('id');
        	expect(firstProduct).toHaveProperty('name');
        	expect(firstProduct).toHaveProperty('price');
		expect(firstProduct).toHaveProperty('stock');
	});

//GET /products/ID
	it('should return a product by ID', async () => {
		const res = await request(app).get('/products/1');
		expect(res.statusCode).toBe(200);
	});
	it('should return 404 if product not found', async () => {
		const res = await request(app).get('/products/3');
		expect(res.statusCode).toBe(404);
		expect(res.body.message).toEqual('Product not found');
	});

//POST /products
	it('should add a new product', async () => {
		const res = await request(app)
		.post('/products')
		.send({ name: 'PC', price: '29999', stock: '10'});
		expect(res.statusCode).toBe(201);
		expect(res.body).toHaveProperty('id', 3);
		expect(res.body).toHaveProperty('name', 'PC');
		expect(res.body).toHaveProperty('price', '29999');
		expect(res.body).toHaveProperty('stock', '10');
	});

//PUT /products
	it('should update an existing product', async () => {
		const res = await request(app)
		.put('/products/3')
		.send({ name: 'Computer' });
		expect(res.statusCode).toBe(200);
		expect(res.body).toHaveProperty('id', 3);
		expect(res.body).toHaveProperty('name', 'Computer');

	});
	it('should return 404 if product not found', async () => {
		const res = await request(app)
		.put('/products/999')
		.send({ name:'Updated Task' });
		expect(res.statusCode).toBe(404);
		expect(res.body).toHaveProperty('message', 'Product not found');
	});

//DELETE /products
	it('should delete a product', async () => {
		const res = await request(app)
		.delete('/products/2');
		expect(res.statusCode).toBe(200);
		expect(res.body).toHaveProperty('message', 'Product deleted');
	});
	it('should return 404 if product not found', async () => {
		const res = await request(app)
		.delete('/products/999');
		expect(res.statusCode).toBe(404);
		expect(res.body).toHaveProperty('message', 'Product not found');
	});
});
