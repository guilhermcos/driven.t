import { Response } from 'express';
import { AuthenticatedRequest } from '../middlewares';
import { getPaymentsService, postPaymentService } from '../services';
import httpStatus from 'http-status';
import { postPaymentRequest } from '../protocols';

export async function getPayments(req: AuthenticatedRequest, res: Response) {
  if (typeof req.query.ticketId !== 'string') {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
  const userId = req.userId;
  const ticketId = parseInt(req.query.ticketId);
  const result = await getPaymentsService(ticketId, userId);
  res.status(httpStatus.OK).send(result);
}

export async function postPayment(req: AuthenticatedRequest, res: Response) {
  const body: postPaymentRequest = req.body;
  const userId = req.userId;
  const result = await postPaymentService(body, userId);
  res.status(httpStatus.OK).send(result);
}
