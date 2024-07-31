//  MIDDLEWARES WORKS BETWEEN REQUEST AND RESPONSE

import jwt from 'jsonwebtoken';

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (token) {
      return res.status(401).json({
        message: 'User Not Authenticated.',
        success: false,
      });
    }
    const decode = await jwt.verify(token, process.env.SECRET_KEY);
    if (!decode) {
      res.status(401).json({
        message: 'Invalid Token.',
        success: false,
      });
    }
    req.id = decode.userId;
    next();
  } catch (error) {
    console.log(Error);
  }
};

export default isAuthenticated;