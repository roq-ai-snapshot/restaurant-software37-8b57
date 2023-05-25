import { UsersInterface } from 'interfaces/users';
import { RestaurantsInterface } from 'interfaces/restaurants';

export interface ReservationsInterface {
  id?: string;
  customer_id: string;
  restaurant_id: string;
  date: Date;
  time: Date;
  party_size: number;
  table_number: number;

  users?: UsersInterface;
  restaurants?: RestaurantsInterface;
}
