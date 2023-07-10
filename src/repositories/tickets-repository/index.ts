import { TicketStatus } from '@prisma/client';
import { prisma } from '../../config';
import { notFoundError } from '../../errors';

async function createNewTicket(ticketTypeId: number, userId: number) {
  const enrollment = await prisma.enrollment.findUnique({
    where: { userId: userId },
  });
  if (!enrollment) {
    throw notFoundError();
  }

  const result = await prisma.ticket.create({
    data: {
      ticketTypeId: ticketTypeId,
      enrollmentId: enrollment.id,
      status: 'RESERVED' as TicketStatus,
    },
    select: {
      id: true,
      status: true,
      ticketTypeId: true,
      enrollmentId: true,
      TicketType: {
        select: {
          id: true,
          name: true,
          price: true,
          isRemote: true,
          includesHotel: true,
          createdAt: true,
          updatedAt: true,
        },
      },
      createdAt: true,
      updatedAt: true,
    },
  });

  return result;
}

async function getTicketTypes() {
  const result = await prisma.ticketType.findMany();
  if (result.length === 0) {
    return [];
  }
  return result;
}

async function getTickets(userId: number) {
  const enrollment = await prisma.enrollment.findUnique({
    where: { userId: userId },
  });
  if (!enrollment) throw notFoundError();
  const result = await prisma.ticket.findFirst({
    where: {
      enrollmentId: enrollment.id,
    },
    select: {
      id: true,
      status: true,
      ticketTypeId: true,
      enrollmentId: true,
      TicketType: {
        select: {
          id: true,
          name: true,
          price: true,
          isRemote: true,
          includesHotel: true,
          createdAt: true,
          updatedAt: true,
        },
      },
      createdAt: true,
      updatedAt: true,
    },
  });
  return result;
}

const ticketsRepository = {
  createNewTicket,
  getTicketTypes,
  getTickets,
};

export default ticketsRepository;
