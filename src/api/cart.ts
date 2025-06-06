import axios, { AxiosResponse } from 'axios';

const cartApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

cartApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const getCart = async (): Promise<AxiosResponse> => {
  try {
    const response = await cartApi.get('/cart');
    console.log('Get cart response:', response.data);
    return response;
  } catch (error) {
    console.error('Get cart error:', error);
    throw error;
  }
};

const addToCart = async (productId: string, quantity: number, sizeId: string): Promise<AxiosResponse> => {
  try {
    const response = await cartApi.post('/cart/items', {
      productId,
      quantity,
      sizeId,
    });
    return response;
  } catch (error) {
    console.error('Add to cart error:', error);
    throw error;
  }
};

const updateCartItem = async (sizeId: string, quantity: number, productId: string): Promise<AxiosResponse> => {
  try {
    const response = await cartApi.put(`/cart/items/${productId}/${sizeId}`, {
      quantity,
    });
    return response;
  } catch (error) {
    console.error('Update cart item error:', error);
    throw error;
  }
};;

const deleteCartItem = async (itemId: string): Promise<AxiosResponse> => {
  try {
    const response = await cartApi.delete(`/cart/${itemId}`);
    return response;
  } catch (error) {
    console.error('Delete cart item error:', error);
    throw error;
  }
};

const removeItemFromCart = async (productId: string,itemId: string): Promise<AxiosResponse> => {
  try {
    const response = await cartApi.delete(`/cart/items/${productId}/${itemId}`);
    return response;
  }
  catch (error) {
    console.error('Remove item from cart error:', error);
    throw error;
  }
};

export { getCart, addToCart, updateCartItem, deleteCartItem, removeItemFromCart };