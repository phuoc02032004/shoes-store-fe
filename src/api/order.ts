import axios, { AxiosResponse } from 'axios';
import { CreateOrderPayload } from '@/types/order';

const orderApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

orderApi.interceptors.request.use(
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

const createOrder = async (orderData: CreateOrderPayload): Promise<AxiosResponse> => {
    try {
        const response = await orderApi.post('/orders', orderData);
        return response;
    } catch (error) {
        console.error('Create order error:', error);
        throw error;
    }
}

const createZaloPay = async (orderId: string): Promise<AxiosResponse> => {
    try {
        const response = await orderApi.post(`/zalopay/create/${orderId}`, { orderId });
        return response;
    } catch (error) {
        console.error('Create ZaloPay error:', error);
        throw error;
    }
}

const getMyOrders = async (): Promise<AxiosResponse> => {
    try {
        const response = await orderApi.get('/orders/myorders');
        return response;
    }
    catch (error) {
        console.error('Get my orders error:', error);
        throw error;
    }
}

export { createOrder, createZaloPay, getMyOrders };






