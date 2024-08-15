import { Router } from 'express'
import { ProductController } from '../controllers/product.js'

export const createProductRouter = ({ productModel }) => {
  const productRouter = Router()

  const productController = new ProductController({ productModel });

  productRouter.get('/todos', productController.getAll);
  productRouter.get('/:productID', productController.getByID);
  productRouter.get('/:productID/detalles', productController.getDetails);

  productRouter.get('/crear', productController.getCreate);
  productRouter.post('/crear', productController.create);

  productRouter.get('/editar', productController.getEdit);
  productRouter.patch('/:productID/editar', productController.edit);

  productRouter.delete('/:productID', productController.delete);

  return productRouter;
};