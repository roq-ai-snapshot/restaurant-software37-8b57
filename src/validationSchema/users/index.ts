import * as yup from 'yup';
import { ordersValidationSchema } from 'validationSchema/orders';
import { reservationsValidationSchema } from 'validationSchema/reservations';
import { restaurantsValidationSchema } from 'validationSchema/restaurants';
import { staffRestaurantValidationSchema } from 'validationSchema/staff-restaurants';

export const usersValidationSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().required(),
  password: yup.string().required(),
  role: yup.string().required(),
  orders: yup.array().of(ordersValidationSchema),
  reservations: yup.array().of(reservationsValidationSchema),
  restaurants: yup.array().of(restaurantsValidationSchema),
  staff_restaurant: yup.array().of(staffRestaurantValidationSchema),
});
