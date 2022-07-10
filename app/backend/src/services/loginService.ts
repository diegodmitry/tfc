import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';

import Users from '../database/models/users';

// exported function to use on test
export const generateToken = (data: string) => {
  const secret = 'mysecret';
  const jwtConfig:object = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  return jwt.sign({ data }, secret, jwtConfig);
};

function verifyToken(token: string) {
  // console.log("🚀 ~ file: loginService.ts ~ line 16 ~ verifyToken ~ token", token)
  const secret = 'mysecret';
  const validToken: any = jwt.verify(token, secret);
  // console.log("🚀 loginService.ts ~ line 19 ~ validToken", validToken)
  // tentei colocar validToken diferente de undefined mas não funciona.
  // if (validToken !== 'undefined') {
  // }
  // console.log("🚀 ~ file: loginService.ts ~ line 19 ~ verifyToken ~ validToken", validToken)
  return validToken;
  // console.log('Invalid Access');
}

// Req 3
export const getUserByMail = async (mail: string, pass: string) => {
  const user = await Users.findOne({ where: { email: mail } });
  const token = generateToken(mail);
  // console.log("🚀 ~ file: loginService.ts ~ line 30 ~ getUserByMail ~ token", token)
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
  // fazer condicao diferente de undefined
  try {
    const validToken = verifyToken(auth);
    // console.log("🚀 ~ file: loginService.ts ~ line 44 ~ getRole ~ validToken", validToken)
    const user = await Users.findOne({ where: { email: validToken.data } });
    if (user !== null) return user.role;
  } catch (error) {
    console.log(error);
  }
};
