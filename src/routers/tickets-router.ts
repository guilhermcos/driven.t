import { Router } from 'express';
import { authenticateToken, validateBody } from '../middlewares';
import { createTicketSchema } from '../schemas';
import { createTicket, getTicketTypes, getTickets } from '../controllers';

const ticketsRouter = Router();

ticketsRouter
  .all('/*', authenticateToken)
  .get('/', getTickets)
  .get('/types', getTicketTypes)
  .post('/', validateBody(createTicketSchema), createTicket);

export { ticketsRouter };
