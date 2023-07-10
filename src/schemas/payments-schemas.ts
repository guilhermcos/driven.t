import Joi from 'joi';
import { postPaymentRequest } from '../protocols';

export const getPaymentsParamsSchema = Joi.object({
  ticketId: Joi.number().integer().required(),
});

export const postPaymentsBodySchema = Joi.object<postPaymentRequest>({
  ticketId: Joi.number().integer().required(),
  cardData: Joi.object({
    issuer: Joi.string().required(),
    number: Joi.number().required(),
    name: Joi.string().required(),
    expirationDate: Joi.required(),
    cvv: Joi.number().required(),
  }),
});
