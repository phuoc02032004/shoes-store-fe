import axios, { AxiosResponse, AxiosInstance } from 'axios';
import { Size } from '../types/sizes';

const sizeApi: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    });

const getSizes = async (): Promise<Size[]> => {
    try {
        const response: AxiosResponse<Size[]> = await sizeApi.get('/sizes');
        return response.data;
    } catch (error) {
        console.error('Error fetching sizes:', error);
        throw error;
    }
}

const getSizeById = async (id: string): Promise<Size> => {
    try {
        const response: AxiosResponse<Size> = await sizeApi.get(`/sizes/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching size with ID ${id}:`, error);
        throw error;
    }
};

export { getSizes, getSizeById };