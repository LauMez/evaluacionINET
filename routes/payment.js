import { Router } from 'express'
import { PaymentController } from '../controllers/payment.js'

export const createPaymentRouter = ({ paymentModel }) => {
  const paymentRouter = Router()

  const paymentController = new PaymentController({ paymentModel });

  paymentRouter.post('/orden', paymentController.order);
  
  paymentRouter.post('/paypal/confirmar', paymentController.paypalConfirm);

  return paymentRouter;
};