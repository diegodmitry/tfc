import { NextFunction, Request, Response } from 'express';

function verifyMail(mail: string):boolean {
  const regexMail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  return regexMail.test(mail);
}

enum StatusCodes {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
}

// Req 5 e 9
const emailMiddleware = (req:Request, res:Response, next: NextFunction) => {
  const { email } = req.body;
  if (email) {
    if (verifyMail(email)) {
      return next();
    } return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Incorrect email or password' });
  } return res.status(StatusCodes.BAD_REQUEST).json({ message: 'All fields must be filled' });
};

export default emailMiddleware;
