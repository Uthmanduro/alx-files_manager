const { v4: uuidv4 } = require('uuid');
const dbClient = require('../utils/db');
const redisClient = require('../utils/redis');

exports.getConnect = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const base64credentials = authHeader.split(' ')[1];
  const credentials = Buffer.from(base64credentials, 'base64').toString('utf-8');
  const email = credentials.split(':')[0];
  const user = await dbClient.db.collection('users').findOne({ email });
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const token = uuidv4();
  const authToken = `auth_${token}`;
  await redisClient.set(authToken, user._id, 86400);
  return res.status(200).json({ token });
};

exports.getDisconnect = async (req, res) => {
  const token = req.headers['x-token'];
  const authToken = `auth_${token}`;
  const userId = await redisClient.get(authToken);
  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  await redisClient.del(authToken);
  return res.status(204).end();
};
