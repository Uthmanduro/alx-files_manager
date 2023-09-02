const redis = require('redis');

class RedisClient {
    constructor() {
        this.client = redis.createClient();
        this.client.on('error', (error) => {
            console.log(`Redis client not connected to the server: ${error.message}`);
        });
    }

    isAlive = () => {
        this.client.on('connect', () => {
            return true;
        });
        return false;
    }

    async get(key) {
        const value = await this.client.get(key);
        return value;
    }

    async set(key, value, duration) {
        await this.client.set(key, value, {
            EX: duration
        });
    }

    async del(key) {
        await this.client.del(key);
    }
}

const redisClient = new RedisClient();

module.exports = redisClient;