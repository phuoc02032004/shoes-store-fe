import axios, {  AxiosInstance,  } from 'axios';
import { Product, ProductApiResponse,  } from '../types/products';

type CreateProductData = Omit<Product, 'id' | '_id' | 'updatedAt' | 'discountedPrice'>;

type UpdateProductData = Partial<Omit<Product, 'id' | '_id' | 'updatedAt'>>;

interface GetProductsParams {
  page?: number;
  limit?: number;
  category?: string;
  sortBy?: string;
  order?: 'asc' | 'desc';
  isOnSale?: boolean;
}

const productApi: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

const getProducts = async (params?: GetProductsParams): Promise<ProductApiResponse> => {
  try {
    const responseData = await productApi.get<ProductApiResponse>('/products', { params });
    return responseData.data;
  } catch (error) {
    console.error('Error in getProducts function:', error);
    throw error;
  }
};

const getProductById = async (id: string): Promise<Product> => {
  try {
    const responseData = await productApi.get<Product>(`/products/${id}`);
    return responseData.data;
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    throw error;
  }
};

const createProduct = async (productData: CreateProductData): Promise<Product> => {
  try {
    const responseData = await productApi.post<Product>('/products', productData);
    return responseData.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

const updateProduct = async (id: string, productData: UpdateProductData): Promise<Product> => {
  try {
    const responseData = await productApi.put<Product>(`/products/${id}`, productData);
    return responseData.data;
  } catch (error) {
    console.error(`Error updating product with ID ${id}:`, error);
    throw error;
  }
};

const deleteProduct = async (id: string): Promise<void> => {
  try {
    await productApi.delete(`/products/${id}`);
  } catch (error) {
    console.error(`Error deleting product with ID ${id}:`, error);
    throw error;
  }
};

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  productApi
};
