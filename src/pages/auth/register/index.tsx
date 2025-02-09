import { useEffect } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

// import PasswordInput from '../utils/PasswordInput';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRegisterUserMutation } from '@/features/user/use-user-query';

const schema = Yup.object().shape({
  scjId: Yup.string().required('Required!'),
  name: Yup.string().required('Required!'),
  email: Yup.string()
    .required('Email is required!')
    .matches(/^((\S+)@(\S+)\.(\S+))$/, {
      message: 'Please enter a valid email address.',
      excludeEmptyString: false,
    }),
  password: Yup.string().required('Required!'),
  confirmPassword: Yup.string()
    .required('Required!')
    .test('passwords-match', 'Passwords do not match', function (value) {
      return this.parent.password === value;
    }),
});

const Register = () => {
  const navigate = useNavigate();

  const { mutate, isLoading, isSuccess } = useRegisterUserMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      scjId: '',
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (data: any) => {
    // navigate('/');
    const reqData = {
      ...data,
      roleId: 1,
      isAdmin: true,
    };
    mutate(reqData);
  };

  useEffect(() => {
    if (isSuccess) {
      navigate('/auth/login');
    }
  }, [isSuccess, navigate]);

  return (
    <div className="md:pl-20 w-full h-full px-4 max-w-[400px] border-l border-gray-300">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full mt-20"
      >
        <h2 className="font-bold text-xl">Register</h2>
        <Controller
          control={control}
          name="scjId"
          render={({ field }) => (
            <Input
              {...field}
              label="SCJ-Id"
              className="rounded-none border border-gray-400"
              type="text"
              error={errors.scjId?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="name"
          render={({ field }) => (
            <Input
              {...field}
              label="Name"
              className="rounded-none border border-gray-400"
              type="text"
              error={errors.name?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <Input
              {...field}
              label="Email"
              className="rounded-none border border-gray-400"
              type="email"
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
        <Controller
          control={control}
          name="confirmPassword"
          render={({ field }) => (
            <Input
              {...field}
              label="Confirm password"
              className="rounded-none border border-gray-400"
              type="password"
              error={errors.confirmPassword?.message}
            />
          )}
        />
        <Button
          className="bg-busanJames rounded-none w-1/3"
          isLoading={isLoading}
        >
          Register
        </Button>
        <p className="text-sm">
          Already have an account? Sign-in{' '}
          <Link
            to={'/auth/login'}
            className="text-busanJames underline font-semibold"
          >
            here.
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
