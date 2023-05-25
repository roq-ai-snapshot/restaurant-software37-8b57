import { OrderItemsInterface } from 'interfaces/order-items';
import { MenusInterface } from 'interfaces/menus';

export interface MenuItemsInterface {
  id?: string;
  name: string;
  description?: string;
  price: number;
  image_url?: string;
  menu_id: string;
  order_items?: OrderItemsInterface[];
  menus?: MenusInterface;
}
