import { Router } from 'express';
import { authenticateToken, validateBody, validateParams } from '../middlewares';
import { postPaymentsBodySchema } from '../schemas';
import { getPayments, postPayment } from '../controllers';

const paymentsRouter = Router();

paymentsRouter
  .all('/*', authenticateToken)
  .get('/', getPayments)
  .post('/process', validateBody(postPaymentsBodySchema), postPayment);

export { paymentsRouter };
