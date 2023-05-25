import * as yup from 'yup';
import { menusValidationSchema } from 'validationSchema/menus';
import { ordersValidationSchema } from 'validationSchema/orders';
import { reservationsValidationSchema } from 'validationSchema/reservations';
import { staffRestaurantValidationSchema } from 'validationSchema/staff-restaurants';

export const restaurantsValidationSchema = yup.object().shape({
  name: yup.string().required(),
  location: yup.string().required(),
  contact_details: yup.string().required(),
  operating_hours: yup.string().required(),
  owner_id: yup.string().nullable().required(),
  menus: yup.array().of(menusValidationSchema),
  orders: yup.array().of(ordersValidationSchema),
  reservations: yup.array().of(reservationsValidationSchema),
  staff_restaurant: yup.array().of(staffRestaurantValidationSchema),
});
