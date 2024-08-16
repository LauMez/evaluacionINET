import express, { json } from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';

import { createAuthRouter } from './routes/auth.js';
import { createAccountRouter } from './routes/account.js';
import { createProductRouter } from './routes/product.js';
import { createCartRouter } from './routes/cart.js';
import { createPaymentRouter } from './routes/payment.js';

import { corsMiddleware } from './middlewares/cors.js';
import 'dotenv/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// después
export const createApp = ({ authModel, accountModel, productModel, cartModel, paymentModel }) => {
  const app = express();
  app.use(json());
  app.use(corsMiddleware());
  app.disable('x-powered-by');

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  }));

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  app.use('/resources', express.static('public'));
  app.use('/resources', express.static(path.join(__dirname, 'public')));

  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'ejs');

  app.use('/', createAuthRouter({ authModel }));
  app.use('/cuenta', createAccountRouter({ accountModel }));
  app.use('/producto', createProductRouter({ productModel }));
  app.use('/carrito', createCartRouter({ cartModel }));
  app.use('/pago', createPaymentRouter({ paymentModel }));

  const PORT = process.env.PORT ?? 1234;

  app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`);
  });
};