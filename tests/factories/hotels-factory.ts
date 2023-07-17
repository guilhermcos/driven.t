import { prisma } from '@/config';
import faker from '@faker-js/faker';

export async function createHotel() {
  return prisma.hotel.create({
    data: {
      name: faker.company.companyName(),
      image: faker.image.imageUrl(),
    },
  });
}

export async function createRoom(hotelId: number) {
  return prisma.room.create({
    data: {
      name: faker.random.numeric(2, { allowLeadingZeros: false }),
      capacity: faker.datatype.number({ min: 1, max: 5 }),
      hotelId: hotelId,
    },
  });
}
