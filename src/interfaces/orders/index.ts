import { OrderItemsInterface } from 'interfaces/order-items';
import { UsersInterface } from 'interfaces/users';
import { RestaurantsInterface } from 'interfaces/restaurants';

export interface OrdersInterface {
  id?: string;
  customer_id: string;
  restaurant_id: string;
  status: string;
  total_price: number;
  created_at: Date;
  updated_at: Date;
  order_items?: OrderItemsInterface[];
  users?: UsersInterface;
  restaurants?: RestaurantsInterface;
}
