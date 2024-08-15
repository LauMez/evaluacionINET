import { Router } from 'express'
import { CartController } from '../controllers/cart.js'

export const createCartRouter = ({ cartModel }) => {
  const cartRouter = Router()

  const cartController = new CartController({ cartModel });

  cartRouter.get('/', cartController.getCart);

  cartRouter.post('/comprar/:productID', cartController.buyProduct);

  cartRouter.post('/agregar', cartController.addProduct);

  cartRouter.post('/agregar/:productID/detalles', cartController.addProductInDetails);

  cartRouter.delete('/eliminar/:productID', cartController.deleteProduct);

  return cartRouter;
};