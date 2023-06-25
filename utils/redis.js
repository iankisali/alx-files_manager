import { createClient } from 'redis';
import { promisify } from 'util';

class RedisClient {
  constructor() {
    this.myClient = createClient();
    this.myClient.on('error', (err) => console.log(err));
  }

  isAlive() {
    return this.myClient.connected;
  }

  async get(key) {
    const redisValue = promisify(this.myClient.get).bind(this.myClient);
    return redisValue(key);
  }

  async set(key, value, duration) {
    const redisTime = promisify(this.myClient.set).bind(this.myClient);
    return redisTime(key, value, 'EX', duration);
  }

  async del(key) {
    const redisDelete = promisify(this.myClient.del).bind(this.myClient);
    return redisDelete(key);
  }
}

const redisClient = new RedisClient();
export default redisClient;
