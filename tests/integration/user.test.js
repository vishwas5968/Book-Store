import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../src/index';
const Redis = require('ioredis');
const redisClient = new Redis();

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
  let token;

  describe('POST http://localhost:3000/api/bookstore_user/', () => {
    it('should send an email to verify user', async () => {
      const res = await request(app).post('/api/bookstore_user/').send({
        name: 'Vishwas Ramesh',
        email: 'vishwasrr9681@gmail.com',
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
        token=res.body.token
      expect(res.status).toBe(200);
    });
  });

  describe('POST http://localhost:3000/api/bookstore_user/login', () => {
    it('Logging in the user', async () => {
      const res = await request(app)
        .post('/api/bookstore_user/login')
        .set('Authorization', token)
        .send({
          email: 'vishwasrr9681@gmail.com',
          password: 'Vishwas@123'
        })
      expect(res.status).toBe(200);
    });
  });
});
