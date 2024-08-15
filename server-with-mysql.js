import { createApp } from './app.js';

import { AuthModel } from './models/mysql/auth.js';
import { AccountModel } from './models/mysql/account.js';
import { ProductModel } from './models/mysql/product.js';
import { CartModel } from './models/mysql/cart.js';

createApp({ authModel: AuthModel, accountModel: AccountModel, productModel: ProductModel, cartModel: CartModel });