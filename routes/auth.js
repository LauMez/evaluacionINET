import { Router } from 'express'
import { AuthController } from '../controllers/auth.js'

export const createAuthRouter = ({ authModel }) => {
  const authRouter = Router()

  const authController = new AuthController({ authModel });

  authRouter.get('', authController.index);

  authRouter.get('/login', authController.logedIn);
  authRouter.post('/login', authController.logIn);

  authRouter.get('/register', authController.registered);
  authRouter.post('/register', authController.register);

  authRouter.get('/logout', authController.logOut);

  return authRouter;
};