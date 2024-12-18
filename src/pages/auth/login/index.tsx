import { useEffect } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

// import PasswordInput from '../utils/PasswordInput';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLoginUserMutation } from '@/features/user/use-user-query';

const schema = Yup.object().shape({
  email: Yup.string()
    .required('Email is required!')
    .matches(/^((\S+)@(\S+)\.(\S+))$/, {
      message: 'Please enter a valid email address.',
      excludeEmptyString: false,
    }),
  password: Yup.string().required('Password is required!'),
});

const Login = () => {
  const navigate = useNavigate();
  const { mutate, isLoading, isSuccess } = useLoginUserMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: unknown) => {
    mutate(data);
  };

  useEffect(() => {
    if (isSuccess) {
      navigate('/');
    }
  }, [isSuccess, navigate]);

  return (
    <div className="md:pl-20 w-full h-full px-4 max-w-[400px] border-l border-gray-300">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full mt-20"
      >
        <h2 className="font-bold text-xl">Sign In</h2>
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <Input
              {...field}
              label="Email"
              className="rounded-none border border-gray-400"
              type="text"
              error={errors.email?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <Input
              {...field}
              label="Password"
              className="rounded-none border border-gray-400"
              type="password"
              error={errors.password?.message}
            />
          )}
        />
        <Button
          className="bg-busanJames rounded-none w-1/3"
          isLoading={isLoading}
        >
          Sign-in
        </Button>
        <p className="text-sm">
          New user? Create a new account{' '}
          <Link
            to={'/auth/register'}
            className="text-busanJames underline font-semibold"
          >
            here.
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
