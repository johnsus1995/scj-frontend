import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import userApi from '../todo/services/user.api';

export const useRegisterUserMutation = () => {
  return useMutation({
    mutationFn: userApi.register,
    onSuccess: (res: any) => {
      void toast.success(res.message);
    },
    onError: (err: any) => {
      void toast.error(err.errorMessage);
    },
  });
};

export const useLoginUserMutation = () => {
  return useMutation({
    mutationFn: userApi.login,
    onSuccess: (res: any) => {
      void toast.success(res.message);
      localStorage.setItem('scj-tok', res.data.token);
    },
    onError: (err: any) => {
      void toast.error(err.errorMessage);
    },
  });
};
