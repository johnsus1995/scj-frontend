import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import examApi from '../services/exam.api';

export const useAddExamMutation = () => {
  return useMutation({
    mutationFn: examApi.add,
    onSuccess: (_res: any) => {
      void toast.success('Create new Todo successfully');
    },
    onError: (_err: any) => {
      void toast.error('Create new Todo failed');
    },
  });
};
