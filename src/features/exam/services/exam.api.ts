import axiosClient from '@/apis/axios-client';

const examApi = {
  addExam: (data: any): Promise<any> => axiosClient.post('api/exams/add', data),
  addQuestion: (data: any): Promise<any> =>
    axiosClient.post('api/question', data),
  addCorrectAnswer: (data: any): Promise<any> =>
    axiosClient.post('api/answer/correct-answer', data),
  getExams: (params: any): Promise<any> =>
    axiosClient.get('api/answer/correct-answer', params),
};

export default examApi;
