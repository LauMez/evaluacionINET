import { Router } from 'express'
import { AccountController } from '../controllers/account.js'

export const createAccountRouter = ({ accountModel }) => {
  const accountRouter = Router()

  const accountController = new accountController({ accountModel });

  accountRouter.get('/', accountController.account);

  accountRouter.get('/crear', accountController.getCreate);
  accountRouter.post('/crear', accountController.create);

  accountRouter.get('/editar', accountController.getEdit);
  accountRouter.post('/editar', accountController.edit);

  return accountRouter;
};