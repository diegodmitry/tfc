import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../services/loginService';

// Req 23
const validateToken = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (authorization) {
    try {
      verifyToken(authorization);
      return next();
    } catch (err) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  }
  return res.status(401).json({ message: 'Token not found!' });
};

export default validateToken;
