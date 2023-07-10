import { notFoundError } from '../../errors';
import ticketsRepository from '../../repositories/tickets-repository';

export async function createTicketService(ticketTypeId: number, userId: number) {
  const newTicketInfo = await ticketsRepository.createNewTicket(ticketTypeId, userId);
  return newTicketInfo;
}

export async function getTicketTypesService() {
  const types = await ticketsRepository.getTicketTypes();
  return types;
}

export async function getTicketsService(userId: number) {
  const tickets = await ticketsRepository.getTickets(userId);
  if (!tickets) throw notFoundError();
  return tickets;
}
