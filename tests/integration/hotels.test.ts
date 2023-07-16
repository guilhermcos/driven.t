import supertest from 'supertest';
import app, { init } from '@/app';
import { cleanDb, generateValidToken } from '../helpers';
import httpStatus from 'http-status';
import {
  createEnrollmentWithAddress,
  createHotel,
  createTicket,
  createTicketTypeWithHotelNoRemote,
  createUser,
} from '../factories';
import * as jwt from 'jsonwebtoken';
import faker from '@faker-js/faker';
import { TicketStatus } from '@prisma/client';

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await cleanDb();
});

const server = supertest(app);

describe('get /hotels', async () => {
  it('should respond with status 401 if no token is given', async () => {
    const response = await server.post('/hotels');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if given token is not valid', async () => {
    const token = faker.lorem.word();

    const response = await server.post('/hotels').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if there is no session for given token', async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.post('/hotels').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe('when token is valid', async () => {
    it('should respond with status 200 and a list of hotels', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const hotel = await createHotel();
      const ticketType = await createTicketTypeWithHotelNoRemote();
      await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);

      const response = await server.get('/hotels').set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.OK);

      expect(response.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: hotel.id,
            name: hotel.name,
            image: hotel.image,
            createdAt: hotel.createdAt.toISOString(),
            updatedAt: hotel.updatedAt.toISOString(),
          }),
        ]),
      );
    });
  });
});