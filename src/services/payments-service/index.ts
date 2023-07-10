import { postPaymentRequest } from '../../protocols';
import paymentsRepository from '../../repositories/payments-repository';

export async function getPaymentsService(ticketId: number, userId: number) {
  const result = await paymentsRepository.getPayments(ticketId, userId);
  return result;
}

export async function postPaymentService(data: postPaymentRequest, userId: number) {
  const result = await paymentsRepository.postPayment(data, userId);
  return result;
}
