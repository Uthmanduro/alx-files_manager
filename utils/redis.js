const { createClient } = require('redis');
const { promisify } = require('util');

class RedisClient {
  constructor() {
    this.client = createClient();
    this.isConnect = true;
    this.client.on('error', (error) => {
      console.log(error);
    });
    this.getAsync = promisify(this.client.get).bind(this.client);
    this.setAsync = promisify(this.client.set).bind(this.client);
    this.client.on('connect', () => {
      this.isConnect = true;
    });
  }

  isAlive() {
    return this.isConnect;
  }

  async get(key) {
    const value = this.getAsync(key);
    return value;
  }

  async set(key, value, duration) {
    this.setAsync(key, value, 'EX', duration);
  }

  async del(key) {
    this.client.del(key);
  }
}

module.eexports =  new RedisClient();
