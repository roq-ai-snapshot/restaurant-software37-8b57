import { MenusInterface } from 'interfaces/menus';
import { OrdersInterface } from 'interfaces/orders';
import { ReservationsInterface } from 'interfaces/reservations';
import { StaffRestaurantInterface } from 'interfaces/staff-restaurant';
import { UsersInterface } from 'interfaces/users';

export interface RestaurantsInterface {
  id?: string;
  name: string;
  location: string;
  contact_details: string;
  operating_hours: string;
  owner_id: string;
  menus?: MenusInterface[];
  orders?: OrdersInterface[];
  reservations?: ReservationsInterface[];
  staff_restaurant?: StaffRestaurantInterface[];
  users?: UsersInterface;
}
