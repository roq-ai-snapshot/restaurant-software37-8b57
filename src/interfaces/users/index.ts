import { OrdersInterface } from 'interfaces/orders';
import { ReservationsInterface } from 'interfaces/reservations';
import { RestaurantsInterface } from 'interfaces/restaurants';
import { StaffRestaurantInterface } from 'interfaces/staff-restaurant';

export interface UsersInterface {
  id?: string;
  name: string;
  email: string;
  password: string;
  role: string;
  orders?: OrdersInterface[];
  reservations?: ReservationsInterface[];
  restaurants?: RestaurantsInterface[];
  staff_restaurant?: StaffRestaurantInterface[];
}
