import { ResponseData } from './types';
import axiosClient from '@/apis/axios-client';

const examApi = {
  add: (data: any): Promise<ResponseData> => axiosClient.post('api/exam', data),
  addQuestion: (data: any): Promise<ResponseData> =>
    axiosClient.post('api/question', data),
  addCorrectAnswer: (data: any): Promise<ResponseData> =>
    axiosClient.post('api/answer/correct-answer', data),
  getExams: (params: any): Promise<ResponseData> =>
    axiosClient.get('api/answer/correct-answer', params),
};

export default examApi;
