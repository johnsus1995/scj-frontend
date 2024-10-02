import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import { Button } from '../ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import examApi from '@/features/todo/services/exam.api';

const schema = Yup.object().shape({
  title: Yup.string().required('Title is required!'),
  description: Yup.string().required('Description is required!'),
});

const CreateExamForm = () => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    formState: { errors },
    reset,
    register,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const { isLoading, mutate } = useMutation({
    mutationFn: async (payload: any) => await examApi.add(payload),
    onSuccess: (res: any) => {
      toast.success(res?.message);
      reset();
      navigate(`/exams/${res.data.id}`);
    },
  });

  const onSubmit = ({ title, description }: any) => {
    mutate({
      adminId: 1,
      title,
      description,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <Input placeholder="Exam title" {...register('title')} />
        <p className="text-xs text-red-500 font-medium">
          {errors.title?.message}
        </p>
      </div>

      <div className="flex flex-col gap-1">
        <Textarea
          placeholder="Type your description here..."
          {...register('description')}
        />
        <p className="text-xs text-red-500 font-medium">
          {errors.description?.message}
        </p>
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="bg-busanJames w-1/12 p-2 rounded-lg text-white cursor-pointer"
        isLoading={isLoading}
      >
        Submit
      </Button>
    </form>
  );
};

export default CreateExamForm;
