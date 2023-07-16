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

export default { findHotels };
