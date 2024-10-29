import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import { Button } from '../ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useAddExamMutation } from '@/features/exam/hooks/use-exam-query';

const schema = Yup.object().shape({
  title: Yup.string().required('Title is required!'),
  description: Yup.string().required('Description is required!'),
});

const CreateExamForm = () => {
  // const navigate = useNavigate();
  const { mutate, isLoading } = useAddExamMutation();

  const {
    handleSubmit,
    formState: { errors },
    // reset,
    register,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: '',
      description: '',
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
        className="bg-busanJames w-fit p-2 rounded-lg text-white"
        isLoading={isLoading}
      >
        Submit
      </Button>
    </form>
  );
};

export default CreateExamForm;
