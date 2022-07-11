import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
// desenvolvido com ajuda do Rafael
import { config } from 'dotenv';

import Users from '../database/models/users';

config();

// desenvolvido com ajuda do Rafael
const secret = process.env.JWT_SECRET || 'jwt_secret';

// exported function to use on test
export const generateToken = (data: string) => {
  const jwtConfig:object = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  return jwt.sign({ data }, secret, jwtConfig);
};

function verifyToken(token: string) {
  // desenvolvido com ajuda do Rafael
  const validToken: string | jwt.JwtPayload = jwt.verify(token, secret);
  const email = (validToken as jwt.JwtPayload).data;
  return email;
}

// Req 3
export const getUserByMail = async (mail: string, pass: string) => {
  const user = await Users.findOne({ where: { email: mail } });
  const token = generateToken(mail);
  const NOT_FOUND = 'NOT FOUND';
  if (user !== null) {
    const validPassword = await bcrypt.compare(pass, user.password);
    if (validPassword) {
      // Req 3
      return { token };
    }
  } return NOT_FOUND;
};

// Req 12
export const getRole = async (auth:string) => {
  try {
    // desenvolvido com ajuda do Rafael
    const email = verifyToken(auth);
    const user = await Users.findOne({ where: { email } });
    if (user !== null) return user.role;
  } catch (error) {
    console.log(error);
  }
};
