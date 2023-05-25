import * as yup from 'yup';
import { orderItemsValidationSchema } from 'validationSchema/order-items';

export const menuItemsValidationSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string(),
  price: yup.number().integer().required(),
  image_url: yup.string(),
  menu_id: yup.string().nullable().required(),
  order_items: yup.array().of(orderItemsValidationSchema),
});
