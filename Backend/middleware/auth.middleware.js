// middleware/auth.middleware.js
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ data: {}, message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, 'secretkey');
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error, 'error')
    res.status(401).json({ data: {}, message: 'Token is not valid' });
  }
};

const adminMiddleware = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({data: {}, message: 'Admin access required' });
  }
  next();
};

module.exports = { authMiddleware, adminMiddleware };
