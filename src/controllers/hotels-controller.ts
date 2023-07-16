import { Response } from 'express';
import { AuthenticatedRequest } from '../middlewares';
import { prisma } from '@/config';
import httpStatus from 'http-status';
import hotelService from '../services/hotels-service';

export async function getHotels(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;
  const result = await hotelService.getHotels(userId);

  res.status(httpStatus.OK).send(result);
}
