import { UsersInterface } from 'interfaces/users';
import { RestaurantsInterface } from 'interfaces/restaurants';

export interface StaffRestaurantInterface {
  id?: string;
  user_id: string;
  restaurant_id: string;

  users?: UsersInterface;
  restaurants?: RestaurantsInterface;
}
