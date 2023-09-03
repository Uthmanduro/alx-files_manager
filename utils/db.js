const { MongoClient } = require('mongodb');

class DBClient {
  host = process.env.DB_HOST || 'localhost';
  port = process.env.DB_PORT || 27017;
  database = process.env.DB_DATABASE || 'files_manager';

  constructor(host, port, database) {
    const url = `mongodb://${host}:${port}`;
    this.client = new MongoClient(url);
    this.isconnected = false;
    this.db = null;
    this.run(database);
  }

  async run(database) {
    await this.client.connect();
    this.isconnected = true;
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
