const sha1 = require('sha1');
const dbClient = require('../utils/db');
const redisClient = require('../utils/redis');
const { ObjectId } = require('mongodb');

function hashPassword(password) {
  return sha1(password);
}

exports.postNew = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Missing email' });
    }

    const { password } = req.body;
    if (!password) {
      return res.status(400).json({ error: 'Missing passsword' });
    }

    const user = await dbClient.db.collection('users').findOne({ email });
    if (user) {
      return res.status(400).json({ error: 'Already exist' });
    }

    const hashedPassword = hashPassword(password);
    const newUser = await dbClient.db.collection('users').insertOne({
      email, password: hashedPassword,
    });
    return res.status(201).json({
      id: newUser.ops[0]._id,
      email: newUser.ops[0].email,
    });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getMe = async (req, res) => {
  const token = req.headers['x-token'];
  const authToken = 'auth_' + token;
  const userId = await redisClient.get(authToken);
  if (!userId) {
    return res.status(401).json({'error': 'Unauthorized'});
  }
  const userObjectId = new ObjectId(userId);
  const user = await dbClient.db.collection('users').findOne({ _id: userObjectId });
  if (!user) {
    res.send(userId);
    return res.status(401).json({'error': 'Unauthorized'});
  }
  return res.json({'id': userId, 'email': user.email});
}
