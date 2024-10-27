import { ResponseData } from './types';
import axiosClient from '@/apis/axios-client';

const userApi = {
  register: (data: any): Promise<ResponseData> =>
    axiosClient.post('public/register', data),
  login: (data: any): Promise<ResponseData> =>
    axiosClient.post('public/login', data),
};

export default userApi;
