import Redis from 'ioredis';
const redis = new Redis();

export const setDataInCache = async (key, value) => {
  console.log(value);
  await redis.setex(key, 3000, JSON.stringify(value));
};

export const getDataInCache = async (key) => {
  return redis.get(key);
};
