import { Router } from 'express';
import emailMiddleware from '../middlewares/emailMiddlewares';
import passwordMiddleware from '../middlewares/passwordMiddlewares';
import { loginController, loginValidateController } from '../controllers/loginController';

const loginRoutes = Router();

loginRoutes.post(
  '/login',
  emailMiddleware,
  passwordMiddleware,
  loginController,
);

loginRoutes.get(
  '/login/validate',
  loginValidateController,
);

export default loginRoutes;
