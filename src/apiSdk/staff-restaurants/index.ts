import axios from 'axios';
import queryString from 'query-string';
import { StaffRestaurantInterface } from 'interfaces/staff-restaurant';
import { GetQueryInterface } from '../../interfaces';

export const getStaffRestaurants = async (query?: GetQueryInterface) => {
  const response = await axios.get(`/api/staff-restaurants${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createStaffRestaurant = async (staffRestaurant: StaffRestaurantInterface) => {
  const response = await axios.post('/api/staff-restaurants', staffRestaurant);
  return response.data;
};

export const updateStaffRestaurantById = async (id: string, staffRestaurant: StaffRestaurantInterface) => {
  const response = await axios.put(`/api/staff-restaurants/${id}`, staffRestaurant);
  return response.data;
};

export const getStaffRestaurantById = async (id: string) => {
  const response = await axios.get(`/api/staff-restaurants/${id}`);
  return response.data;
};
