import { Response } from 'express';
import { AuthenticatedRequest } from '../middlewares';
import { prisma } from '@/config';
import httpStatus from 'http-status';
import hotelService from '../services/hotels-service';
import { requestError } from '../errors';
import { HotelId } from '../protocols';

export async function getHotels(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;
  const result = await hotelService.getHotels(userId);

  res.status(httpStatus.OK).send(result);
}

export async function getHotelById(req: AuthenticatedRequest, res: Response) {
  const params = req.params as HotelId;
  const userId = req.userId;
  const hotelId = Number(params.hotelId);

  const result = await hotelService.getHotelById(hotelId, userId);

  res.status(httpStatus.OK).send(result);
}
