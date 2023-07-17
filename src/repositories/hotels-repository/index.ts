import { prisma } from '@/config';

async function findHotels() {
  return await prisma.hotel.findMany({
    select: {
      id: true,
      name: true,
      image: true,
      updatedAt: true,
      createdAt: true,
    },
  });
}

async function findHotelById(hotelId: number) {
  return await prisma.hotel.findUnique({
    where: {
      id: hotelId,
    },
    select: {
      id: true,
      name: true,
      image: true,
      updatedAt: true,
      createdAt: true,
      Rooms: {
        select: {
          id: true,
          name: true,
          capacity: true,
          hotelId: true,
          createdAt: true,
          updatedAt: true,
        },
      },
    },
  });
}

export default { findHotels, findHotelById };
