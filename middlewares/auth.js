const jwt = require('jsonwebtoken');
const { User } = require('../app/models');
const dotenv = require('dotenv');
dotenv.config();
const auth = (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization;
    const bearer = bearerToken.split(" ");
    // console.log(bearer);
    const token = bearer[1];
    if (!token) {
      return res.status(401).json({
        status: 'failed',
        message: 'Required authorization',
      });
    }
    const payload = jwt.verify(token, "rahasia");
    console.log(payload,"payload")
    User.findOne({
      where: {
        id : payload.id
      }
    }).then((instance) => {
      console.log(instance, "instance")
      req.user = instance;
      next();
    });
  } catch {
    res.status(401).json({
      status: 'failed',
      message: 'Invalid token',
    });
  }
}
module.exports = auth;