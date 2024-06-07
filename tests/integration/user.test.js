import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../src/index';
const Redis = require('ioredis');
const redisClient = new Redis();
let token;
let productId;
describe('User APIs Test', () => {
  // before((done) => {
  //   const clearCollections = () => {
  //     for (const collection in mongoose.connection.collections) {
  //       mongoose.connection.collections[collection].deleteOne(() => {});
  //     }
  //   };

  //   const mongooseConnect = async () => {
  //     await mongoose.connect(process.env.DATABASE_TEST);
  //     clearCollections();
  //   };

  //   if (mongoose.connection.readyState === 0) {
  //     mongooseConnect();
  //   } else {
  //     clearCollections();
  //   }
  //   done();
  // });

  describe('POST http://localhost:3000/api/bookstore_user/', () => {
    it('should send an email to verify user', async () => {
      const res = await request(app).post('/api/bookstore_user/').send({
        name: 'Vishwas Ramesh',
        email: 'vishwasrr9628111@gmail.com',
        password: 'Vishwas@123',
        phone: 9999999999
      });
      token = res.body.token;
      expect(res.status).toBe(200);
    });
  });

  describe('POST http://localhost:3000/api/bookstore_user/verification', () => {
    it('Verifying user', async () => {
      const res = await request(app)
        .post('/api/bookstore_user/verification')
        .set('Authorization', token);
      expect(res.status).toBe(200);
    });
  });

  describe('POST http://localhost:3000/api/bookstore_user/login', () => {
    it('Logging in the user', async () => {
      const res = await request(app)
        .post('/api/bookstore_user/login')
        .set('Authorization', token)
        .send({
          email: 'vishwasrr9628111@gmail.com',
          password: 'Vishwas@123'
        });
      expect(res.status).toBe(200);
    });
  });

  console.log(token);

  describe('POST http://localhost:3000/api/bookstore_user/book/admin', () => {
    it('Add new book', async () => {
      const res = await request(app)
        .post('/api/bookstore_user/book/admin')
        .set('Authorization', token)
        .send({
          description:
            'A visually stunning and comprehensive guide to the hit BBC series',
          discountPrice: 450,
          bookName: 'Sherlock: Chronicles',
          author: 'Steve Tribe',
          quantity: -5,
          price: 800
        });
      console.log(res.body);
      productId = res.body.data._id;
      expect(res.status).toBe(200);
    });
  });

  describe('GET http://localhost:3000/api/bookstore_user/book/', () => {
    it('Fetch all books', async () => {
      const res = await request(app)
        .get(`/api/bookstore_user/book`)
        .set('Authorization', token);
      expect(res.status).toBe(200);
    });
  });

  describe('GET http://localhost:3000/api/bookstore_user/book/:productId', () => {
    it('Fetch book based on Id', async () => {
      const res = await request(app)
        .get(`/api/bookstore_user/book/${productId}`)
        .set('Authorization', token);
      expect(res.status).toBe(200);
    });
  });

  describe('PUT http://localhost:3000/api/bookstore_user/book/admin/:productId', () => {
    it('Update book based on Id', async () => {
      const res = await request(app)
        .put(`/api/bookstore_user/book/admin/${productId}`)
        .set('Authorization', token)
        .send({
          description:
            'A visually stunning and comprehensive guide to the hit BBC series, Sherlock: Chronicles tells the full story of the show as you’ve never seen it before. Packed with exclusive unseen material, including all-new interviews with the cast and crew, this is Sherlock from the ground up: from story and script development to casting, sets, costumes, props, music and more. Each episode of the spectacular three series is remembered by those who made it, from the show’s dazzling debut in A Study in Pink to this year’s breathtaking finale, His Last Vow.Featuring over 500 images of concept artwork, photographs, costume and set designs, and more, Chronicles is the ultimate celebration for Sherlock fans everywhere.',
          discountPrice: 450,
          bookName: 'Sherlock: Chronicles',
          author: 'Steve Tribe',
          quantity: -5,
          price: 800
        });
      expect(res.status).toBe(200);
    });
  });

  describe('DELETE http://localhost:3000/api/bookstore_user/book/admin/:productId', () => {
    it('Delete book based on Id', async () => {
      const res = await request(app)
        .delete(`/api/bookstore_user/book/admin/${productId}`)
        .set('Authorization', token);
      expect(res.status).toBe(200);
    });
  });
});
