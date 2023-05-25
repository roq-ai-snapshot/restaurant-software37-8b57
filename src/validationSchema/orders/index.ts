import * as yup from 'yup';
import { orderItemsValidationSchema } from 'validationSchema/order-items';

export const ordersValidationSchema = yup.object().shape({
  status: yup.string().required(),
  total_price: yup.number().integer().required(),
  created_at: yup.date().required(),
  updated_at: yup.date().required(),
  customer_id: yup.string().nullable().required(),
  restaurant_id: yup.string().nullable().required(),
  order_items: yup.array().of(orderItemsValidationSchema),
});
