import { NextFunction, Request, Response } from 'express';

enum StatusCodes {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
}

// Req 7 e 11
const passwordMiddleware = (req:Request, res:Response, next: NextFunction) => {
  const { password } = req.body;
  if (password) {
    if (password.length > 5) {
      return next();
    } return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Incorrect email or password' });
  } return res.status(StatusCodes.BAD_REQUEST).json({ message: 'All fields must be filled' });
};

export default passwordMiddleware;
