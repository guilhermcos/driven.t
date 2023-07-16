import { prisma } from '@/config';
import hotelsRepository from '../../repositories/hotels-repository';
import { notFoundError } from '../../errors';
import enrollmentRepository from '../../repositories/enrollment-repository';
import ticketsRepository from '../../repositories/tickets-repository';
import { TicketStatus } from '@prisma/client';
import { paymentRequiredError } from '../../errors/payment-required-error';

export async function getHotels(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw notFoundError();

  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket) throw notFoundError();

  if (ticket.status !== TicketStatus.PAID || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) {
    throw paymentRequiredError();
  }
  const result = await hotelsRepository.findHotels();
  if (result.length === 0) throw notFoundError();

  return result;
}

const hotelService = { getHotels };
export default hotelService;
