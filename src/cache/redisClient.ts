import { createClient } from 'redis';

const redisClient = createClient();

redisClient.on('error', (err) => console.error('Redis Client Error', err));

await redisClient.connect();

try {
  await redisClient.configSet('maxmemory', '2gb');
  await redisClient.configSet('maxmemory-policy', 'allkeys-lru');
} catch (error) {
  console.warn('Unable to configure Redis:', error);
}

export default redisClient;
