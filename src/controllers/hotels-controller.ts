import { Response } from 'express';
import { AuthenticatedRequest } from '../middlewares';
import { prisma } from '@/config';
import httpStatus from 'http-status';

export async function getHotels(req: AuthenticatedRequest, res: Response) {
  const result = await prisma.hotel.findMany({
    select: {
      id: true,
      name: true,
      image: true,
      updatedAt: true,
      createdAt: true,
    },
  });

  res.status(httpStatus.OK).send(result);
}
