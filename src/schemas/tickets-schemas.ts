import Joi from 'joi';
import { createTicketRequest } from '../protocols';

export const createTicketSchema = Joi.object<createTicketRequest>({
  ticketTypeId: Joi.number().integer().required(),
});
