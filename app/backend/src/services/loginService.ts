import * as jwt from 'jsonwebtoken';

import Users from '../database/models/users';

const generateToken = (data: string) => {
  const secret = 'mysecret';
  const jwtConfig:object = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  return jwt.sign({ data }, secret, jwtConfig);
};

function verifyToken(token: string) {
  try {
    const secret = 'mysecret';
    const validToken: any = jwt.verify(token, secret);
    return validToken;
  } catch (error) {
    console.log(error);
  }
}

// Req 3
export const getUserByMail = async (mail: string, pass: string) => {
  const user = await Users.findOne({ where: { email: mail } });
  const token = generateToken(mail);
  const NOT_FOUND = 'NOT FOUND';
  if (user !== null) {
    const validPassword = pass === user?.password;
    if (validPassword) {
      // Req 3
      return { token };
    }
  } return NOT_FOUND;
};

// Req 12
export const getRole = async (auth:string) => {
  const validToken = verifyToken(auth);
  const user = await Users.findOne({ where: { email: validToken.data } });
  if (user !== null) return user.role;
};
