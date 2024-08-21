import { ResponseData } from './types';
import axiosClient from '@/apis/axios-client';

const examApi = {
  add: (data: any): Promise<ResponseData> => axiosClient.post('api/exam', data),
};

export default examApi;
