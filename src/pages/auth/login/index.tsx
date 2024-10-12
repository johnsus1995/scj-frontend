import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';

// import PasswordInput from '../utils/PasswordInput';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const schema = Yup.object().shape({
  email: Yup.string()
    .required('Email is required!')
    .matches(/^((\S+)@(\S+)\.(\S+))$/, {
      message: 'Please enter a valid email address.',
      excludeEmptyString: false,
    }),
  scjId: Yup.string().required('SCJ Id is required!'),
  password: Yup.string().required('Password is required!'),
});

const Login = () => {
  const {
    control,
    handleSubmit,
    // formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (_data: unknown) => {
    //
  };

  return (
    <div className="w-full h-full px-4 max-w-[400px] border-l border-gray-300">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full mt-40"
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
              type="text"
            />
          )}
        />
        <Button className="bg-busanJames rounded-none w-1/3">Sign-in</Button>
      </form>
    </div>
  );
};

export default Login;
