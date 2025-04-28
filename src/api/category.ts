import { Category } from '../types/products';
import axios from 'axios';

const categoryApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
}); 

const getCategories = async (): Promise<Category[]> => {
  try {
    const response = await categoryApi.get<Category[]>('/categories');
    return response.data;
  } catch (error) {
    console.error('Get categories error:', error);
    throw error;
  }
};

const getCategoryById = async (id: string): Promise<Category> => {
  try {
    const response = await categoryApi.get<Category>(`/categories/${id}`);
    return response.data;
  } catch (error) {
    console.error('Get category by ID error:', error);
    throw error;
  }
};

export { getCategories, getCategoryById };  