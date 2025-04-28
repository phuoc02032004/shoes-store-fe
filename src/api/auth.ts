import axios, { AxiosResponse } from 'axios';

const authApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


authApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }
);

const Login = async (email: string, password: string): Promise<AxiosResponse> => {
    try{
        const response = await authApi.post('/auth/login', {
            email,
            password,
        });
        localStorage.setItem('token', response.data.token);
        return response;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
}

const Register = async (name: string, email: string, password: string): Promise<AxiosResponse> => {
    try{
        const response = await authApi.post('/auth/register', {
            name,
            email,
            password,
        });
        console.log('Register response:', response.data);
        return response;
        
    } catch (error) {
        console.error('Register error:', error);
        throw error;
    }
}

const verifyToken = async (otp: string, email: string): Promise<AxiosResponse> => {
    try {
        const data = { email, otp };
        console.log('verifyToken request data:', data);
        const response = await authApi.post('/auth/verify-otp', data);

        return response;
    } catch (error) {
        console.error('Verify token error:', error);
        throw error;
    }
}

export { Login, Register, verifyToken };

