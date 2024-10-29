import axiosClient from '@/apis/axios-client';

const examApi = {
  add: (data: any): Promise<any> => axiosClient.post('api/exam/create', data),
  addQuestion: (data: any): Promise<any> =>
    axiosClient.post('api/question', data),
  addCorrectAnswer: (data: any): Promise<any> =>
    axiosClient.post('api/answer/correct-answer', data),
  getExams: (params: any): Promise<any> =>
    axiosClient.get('api/answer/correct-answer', params),
};

export default examApi;
