import { prisma } from '@/config';
import { notFoundError, unauthorizedError } from '../../errors';
import { postPaymentRequest } from '../../protocols';

async function getPayments(ticketId: number, userId: number) {
  const ticket = await prisma.ticket.findUnique({
    where: {
      id: ticketId,
    },
  });
  if (!ticket) throw notFoundError();

  const enrollment = await prisma.enrollment.findFirst({
    where: {
      id: ticket.enrollmentId,
    },
  });
  if (enrollment.userId !== userId) throw unauthorizedError();

  const result = await prisma.payment.findFirst({
    where: {
      ticketId: ticketId,
    },
    select: {
      id: true,
      ticketId: true,
      value: true,
      cardIssuer: true,
      cardLastDigits: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return result;
}

export async function postPayment(data: postPaymentRequest, userId: number) {
  const ticket = await prisma.ticket.findUnique({
    where: {
      id: data.ticketId,
    },
    select: {
      id: true,
      enrollmentId: true,
      TicketType: {
        select: {
          price: true,
        },
      },
    },
  });
  if (!ticket) throw notFoundError();

  const enrollment = await prisma.enrollment.findFirst({
    where: {
      id: ticket.enrollmentId,
    },
  });
  if (enrollment.userId !== userId) throw unauthorizedError();

  const result = await prisma.payment.create({
    data: {
      ticketId: data.ticketId,
      value: ticket.TicketType.price,
      cardIssuer: data.cardData.issuer,
      cardLastDigits: data.cardData.number.toString().slice(-4),
    },
  });
  if (!result) throw notFoundError();

  const updated = await prisma.ticket.update({
    where: {
      id: data.ticketId,
    },
    data: {
      status: 'PAID',
    },
  });

  return result;
}

const paymentsRepository = {
  getPayments,
  postPayment,
};

export default paymentsRepository;
