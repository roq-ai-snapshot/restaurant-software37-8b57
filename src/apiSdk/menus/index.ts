import axios from 'axios';
import queryString from 'query-string';
import { MenusInterface } from 'interfaces/menus';
import { GetQueryInterface } from '../../interfaces';

export const getMenus = async (query?: GetQueryInterface) => {
  const response = await axios.get(`/api/menus${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createMenus = async (menus: MenusInterface) => {
  const response = await axios.post('/api/menus', menus);
  return response.data;
};

export const updateMenusById = async (id: string, menus: MenusInterface) => {
  const response = await axios.put(`/api/menus/${id}`, menus);
  return response.data;
};

export const getMenusById = async (id: string) => {
  const response = await axios.get(`/api/menus/${id}`);
  return response.data;
};
