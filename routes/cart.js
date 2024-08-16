import { Router } from 'express'
import { CartController } from '../controllers/cart.js'

export const createCartRouter = ({ cartModel }) => {
  const cartRouter = Router()

  const cartController = new CartController({ cartModel });

  cartRouter.get('/', cartController.getCart);

  cartRouter.get('/comprar/:productID', cartController.buyProduct);

  cartRouter.post('/agregar', cartController.addProduct);

  cartRouter.post('/agregar/:productID/detalles', cartController.addProductInDetails);

  cartRouter.post('/actualizarCantidad/:productID', cartController.updateQuantity);
  
  // cartRouter

  cartRouter.delete('/eliminar/:productID', cartController.deleteProduct);

  return cartRouter;
};