const { ObjectId } = require('mongodb');
const dbClient = require('../utils/db');
const redisClient = require('../utils/redis');

exports.postUpload = async (req, res) => {
  const token = req.headers['x-token'];
  const authToken = `auth_${token}`;
  const userId = await redisClient.get(authToken);
  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const userObjectId = new ObjectId(userId);
  const user = await dbClient.db.collection('users').findOne({ _id: userObjectId });
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Missing name' });
  }

  const { type } = req.body;
  const options = ['folder', 'file', 'image']
  if (!type || !options.includes(type)) {
    return res.status(400).json({ error: 'Missing type' });
  }

  const { data } = req.body;
  if (!data && type !== 'folder') {
    return res.status(400).json({ error: 'Missing data' });
  }

  const parentId = req.body.parentId || 0;
  if (parentId !== 0) {

  }
  const isPublic = req.body.isPublic || false;
};
