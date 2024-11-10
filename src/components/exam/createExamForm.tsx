import { useEffect } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { format } from 'date-fns';
import { Controller, useForm } from 'react-hook-form';
// import { useNavigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import { Button } from '../ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useAddExamMutation } from '@/features/exam/hooks/use-exam-query';

const schema = Yup.object().shape({
  title: Yup.string().required('Title is required!'),
  description: Yup.string().required('Description is required!'),
  deadline: Yup.date()
    .required('Deadline is required')
    .typeError('Invalid date format'),
  duration: Yup.string().required('Duration is required!'),
});

const CreateExamForm = () => {
  const navigate = useNavigate();
  const { mutate, isLoading, data } = useAddExamMutation();

  const {
    handleSubmit,
    control,
    formState: { errors },
    // reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: '',
      description: '',
      deadline: new Date(),
      duration: '1',
    },
  });

  const onSubmit = ({ title, description, deadline, duration }: any) => {
    mutate({
      adminId: 1,
      title,
      description,
      deadline: format(deadline, 'yyyy-MM-dd'),
      duration,
      createdBy: 1,
    });
  };

  useEffect(() => {
    if (data?.data?.id) {
      navigate(`/exams/${data?.data?.id}`);
    }
  }, [data, data?.id, navigate, isLoading]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 pb-4"
    >
      <Controller
        control={control}
        name="title"
        render={({ field }) => (
          <Input
            {...field}
            label="Exam title"
            className="rounded-none border border-gray-400"
            type="text"
            error={errors.title?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="deadline"
        render={({ field }) => (
          <Input
            {...field}
            value={
              field.value ? format(new Date(field.value), 'yyyy-MM-dd') : ''
            }
            label="Deadline"
            className="rounded-none border border-gray-400"
            type="date"
            error={errors.deadline?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="duration"
        render={({ field }) => (
          <Input
            {...field}
            label="Duration"
            className="rounded-none border border-gray-400"
            type="time"
            error={errors.duration?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="description"
        render={({ field }) => (
          <Textarea
            {...field}
            label="Description"
            className="rounded-none border border-gray-400"
            error={errors.description?.message}
          />
        )}
      />

      <Button
        type="submit"
        disabled={isLoading}
        className="bg-busanJames md:w-fit p-2 rounded-lg text-white"
        isLoading={isLoading}
      >
        Submit
      </Button>
    </form>
  );
};

export default CreateExamForm;
