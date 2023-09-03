const { MongoClient } = require('mongodb');
// const { promisify } = require('util');

class DBClient {
  constructor(host = 'localhost', port = 27017, database = 'files_manager') {
    const url = `mongodb://${host}:${port}`;
    this.client = new MongoClient(url);
    this.isconnected = this.run(database);
  }

  async run(database) {
    await this.client.connect();
    this.db = this.client.db(database);
  }

  isAlive() {
    return this.isconnected;
  }

  async nbUsers() {
    const users = await this.db.collection('users');
    return users.countDocuments();
  }

  async nbFiles() {
    const files = await this.db.collection('files').countDocuments();
    return files;
  }
}

export default new DBClient();
