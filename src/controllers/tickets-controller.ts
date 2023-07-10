import { Request, Response } from 'express';
import { createTicketRequest } from '../protocols';
import { createTicketService, getTicketTypesService, getTicketsService } from '../services';
import { AuthenticatedRequest } from '../middlewares';
import httpStatus from 'http-status';

export async function createTicket(req: AuthenticatedRequest, res: Response) {
  const { ticketTypeId }: createTicketRequest = req.body;
  const userId = req.userId;
  const result = await createTicketService(ticketTypeId, userId);
  res.status(httpStatus.CREATED).send(result);
}

export async function getTicketTypes(req: AuthenticatedRequest, res: Response) {
  const result = await getTicketTypesService();
  res.status(httpStatus.OK).send(result);
}

export async function getTickets(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;
  const result = await getTicketsService(userId);
  res.status(httpStatus.OK).send(result);
}
