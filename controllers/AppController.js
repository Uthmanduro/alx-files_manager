const redis = require('../utils/redis');
const db = require('../utils/db');

exports.getStatus = (req, res) => {
  res.status(200).json({
    redis: redis.isAlive(),
    db: db.isAlive(),
  });
};

exports.getStats = (req, res) => {
  res.status(200).json({ users: db.nbUsers, files: db.nbFiles });
};
