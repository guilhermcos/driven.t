import Joi from 'joi';
import { HotelId } from '../protocols';

export const hotelIdSchema = Joi.object<HotelId>({
  hotelId: Joi.string().regex(/^\d+$/).required(),
});
