import { Request, Response } from 'express';
import { getUserByMail, getRole } from '../services/loginService';

enum StatusCodes {
  OK = 200,
  UNAUTHORIZED = 401,
}

// Req 3 and 9
export const loginController = async (req:Request, res:Response) => {
  const { email, password } = req.body;
  const token = await getUserByMail(email, password);
  if (token !== 'NOT FOUND') {
    return res.status(StatusCodes.OK).json(token);
  } return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Incorrect email or password' });
};

// Req 12
export const loginValidateController = async (req:Request, res:Response) => {
  const { authorization } = req.headers;
  if (authorization !== undefined) {
    const role = await getRole(authorization);
    return res.status(200).json({ role });
  } return res.status(401).json({ message: 'Token inválido' });
};
