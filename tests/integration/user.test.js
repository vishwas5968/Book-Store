import request from 'supertest';
import app from '../../src/index';
import mongoose from 'mongoose';
import expect from 'expect';

let token;
let bookId;
// let userId;
describe('User APIs Test', () => {
  beforeAll((done) => {
    const clearCollections = () => {
      for (const collection in mongoose.connection.collections) {
        mongoose.connection.collections[collection].deleteOne(() => {});
      }
    };

    const mongooseConnect = async () => {
      await mongoose.connect(process.env.DATABASE_TEST);
      clearCollections();
    };

    if (mongoose.connection.readyState === 0) {
      mongooseConnect();
    } else {
      clearCollections();
    }
    done();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe('POST http://localhost:3000/api/bookstore/users', () => {
    it('should send an email to verify user', async () => {
      const res = await request(app).post('/api/bookstore/users').send({
        name: 'Vishwas Ramesh',
        email: 'vishwasrr968@gmail.com',
        password: 'Vishwas@123',
        phone: 9999999999
      });
      token = res.body.token;
      expect(res.status).toBe(200);
    });
  });

  describe('POST http://localhost:3000/api/bookstore/users/verification', () => {
    it('Verifying user', async () => {
      const res = await request(app)
        .post('/api/bookstore/users/verification')
        .set('Authorization', token);
      console.log('res.body', res.body);
      token = res.body.token;
      expect(res.status).toBe(200);
    });
  });

  describe('POST http://localhost:3000/api/bookstore/users/login', () => {
    it('Logging in the user', async () => {
      const res = await request(app)
        .post('/api/bookstore/users/login')
        .set('Authorization', token)
        .send({
          email: 'vishwasrr968@gmail.com',
          password: 'Vishwas@123'
        });
      token = res.body.token.jwt;
      console.log('res.body', res.body);
      expect(res.status).toBe(200);
      console.log(token);
    });
  });

  describe('POST http://localhost:3000/api/bookstore/books/admin', () => {
    it('Add new books', async () => {
      const res = await request(app)
        .post('/api/bookstore/books/admin')
        .set('Authorization', token)
        .send({
          description:
            'A visually stunning and comprehensive guide to the hit BBC series',
          discountPrice: 450,
          bookName: 'Sherlock: Chronicles',
          author: 'Steve Tribe',
          quantity: 5,
          price: 800
        });
      bookId = res.body.data._id;
      expect(res.status).toBe(200);
    });
  });

  describe('GET http://localhost:3000/api/bookstore/books/', () => {
    it('Fetch all books', async () => {
      const res = await request(app)
        .get(`/api/bookstore/books`)
        .set('Authorization', token);
      expect(res.status).toBe(200);
    });
  });

  describe('GET http://localhost:3000/api/bookstore/books/:bookId', () => {
    it('Fetch books based on Id', async () => {
      const res = await request(app)
        .get(`/api/bookstore/books/${bookId}`)
        .set('Authorization', token);
      expect(res.status).toBe(200);
    });
  });

  describe('PUT http://localhost:3000/api/bookstore/books/admin/:bookId', () => {
    it('Update books based on Id', async () => {
      const res = await request(app)
        .put(`/api/bookstore/books/admin/${bookId}`)
        .set('Authorization', token)
        .send({
          description: 'Hit BBC series, Sherlock: Chronicles.',
          discountPrice: 450,
          bookName: 'Sherlock: Chronicles',
          author: 'Steve Tribe',
          quantity: 15,
          price: 800
        });
      expect(res.status).toBe(200);
    });
  });

  describe('DELETE http://localhost:3000/api/bookstore/books/admin/:bookId', () => {
    it('Delete books based on Id', async () => {
      const res = await request(app)
        .delete(`/api/bookstore/books/admin/${bookId}`)
        .set('Authorization', token);
      expect(res.status).toBe(200);
    });
  });

  describe('GET http://localhost:3000/api/bookstore/cart/', () => {
    it('Get Cart based on User Id', async () => {
      const res = await request(app)
        .get(`/api/bookstore/carts`)
        .set('Authorization', token);
      expect(res.status).toBe(200);
    });
  });

  describe('POST http://localhost:3000/api/bookstore/cart/add/${bookId}', () => {
    it('Add books to Cart based on books Id', async () => {
      const res = await request(app)
        .post(`/api/bookstore/carts/add/${bookId}`)
        .set('Authorization', token);
      expect(res.status).toBe(200);
    });
  });

  describe('POST http://localhost:3000/api/bookstore/cart/remove/${bookId}', () => {
    it('Remove books from Cart based on books Id', async () => {
      const res = await request(app)
        .post(`/api/bookstore/carts/remove/${bookId}`)
        .set('Authorization', token);
      expect(res.status).toBe(200);
    });
  });

  describe('GET http://localhost:3000/api/bookstore/wishlist/', () => {
    it('Get Wishlist based on User Id', async () => {
      const res = await request(app)
        .get(`/api/bookstore/wishlists`)
        .set('Authorization', token);
      expect(res.status).toBe(200);
    });
  });

  describe('POST http://localhost:3000/api/bookstore/wishlist/${bookId}', () => {
    it('Add books to Wishlist based on books Id', async () => {
      const res = await request(app)
        .post(`/api/bookstore/wishlists/add/${bookId}`)
        .set('Authorization', token);
      expect(res.status).toBe(200);
    });
  });

  describe('POST http://localhost:3000/api/bookstore/wishlist/remove/${bookId}', () => {
    it('Remove books from Wishlist based on books Id', async () => {
      const res = await request(app)
        .post(`/api/bookstore/wishlists/remove/${bookId}`)
        .set('Authorization', token);
      expect(res.status).toBe(200);
    });
  });

  describe('GET http://localhost:3000/api/bookstore/order/', () => {
    it('Get Order based on User Id', async () => {
      const res = await request(app)
        .get(`/api/bookstore/orders`)
        .set('Authorization', token);
      expect(res.status).toBe(200);
    });
  });

  describe('GET http://localhost:3000/api/bookstore/customer-details/', () => {
    it('Get Customer-details based on User Id', async () => {
      const res = await request(app)
        .get(`/api/bookstore/customer-details`)
        .set('Authorization', token);
      expect(res.status).toBe(400);
    });
  });

  describe('POST http://localhost:3000/api/bookstore/customer-details/', () => {
    it('Add customer-details of User', async () => {
      const res = await request(app)
        .post(`/api/bookstore/customer-details`)
        .set('Authorization', token)
        .send({
          fullName: 'Vishwas',
          mobileNumber: '23456789056',
          address: [
            {
              type: 'home',
              addressLine: 'Default Home Address Line',
              city: 'Default City',
              state: 'Default State',
              postalCode: '000000',
              country: 'Default Country'
            }
          ]
        });
      expect(res.status).toBe(200);
    });
  });
});
