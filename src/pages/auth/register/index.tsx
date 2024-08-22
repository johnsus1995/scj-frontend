import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';

// import PasswordInput from '../utils/PasswordInput';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const registerSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('First name is required!')
    .matches(/^(?=.*[a-zA-Z0-9])[a-zA-Z0-9]*$/, {
      message: 'First name must be a string, number, or a combination of both!',
    }),
  lastName: Yup.string()
    .required('Last name is required!')
    .matches(/^(?=.*[a-zA-Z0-9])[a-zA-Z0-9]*$/, {
      message: 'Last name must be a string, number, or a combination of both!',
    }),
  // phone: Yup.string().required("Phone is required!"),
  email: Yup.string()
    .required('Email is required!')
    .matches(/^((\S+)@(\S+)\.(\S+))$/, {
      message: 'Please enter a valid email address.',
      excludeEmptyString: false,
    }),
  scjId: Yup.string().required('SCJ Id is required!'),
  password: Yup.string()
    .required('Password is required!')
    .min(8, 'Password must be at least 8 character long')
    .matches(
      RegExp('(.*[a-z].*)'),
      'Password should contain at least one lowercase character.',
    )
    .matches(
      RegExp('(.*[A-Z].*)'),
      'Password should contain at least one uppercase character.',
    )
    .matches(
      RegExp('(.*\\d.*)'),
      'Password should contain at least one number.',
    )
    .matches(
      RegExp('[!@#$%^&*(),.?":{}|<>]'),
      'Password should contain at least one special character.',
    ),
  confirmPassword: Yup.string()
    .required('Confirm password is required!')
    .test('passwords-match', 'Passwords do not match', function (value) {
      return this.parent.password === value;
    }),
});

const Register = () => {
  const {
    control,
    handleSubmit,
    // formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      scjId: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmitSignUp = (_data: unknown) => {
    //
  };

  return (
    <div className="SignUpPage h-[calc(100vh_-_160px)] flex flex-col justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmitSignUp)}
        className="max-w-[500px] w-full flex flex-col gap-5 bg-[#E7E4D6] p-6 rounded-2xl shadow-md"
      >
        <h2 className="font-bold text-xl bg-inherit mx-auto">Sign Up</h2>
        <div className="flex gap-4 bg-inherit">
          <Controller
            control={control}
            name="firstName"
            render={({ field }) => (
              <Input
                placeholder="first name"
                className="rounded-xl"
                type="text"
                {...field}
              />
            )}
          />

          <Controller
            control={control}
            name="lastName"
            render={({ field }) => (
              <Input
                // requiredField={true}
                placeholder=""
                className="rounded-xl"
                type="text"
                {...field}
              />
            )}
          />
        </div>
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <Input
              placeholder=""
              className="rounded-xl"
              type="text"
              {...field}
            />
          )}
        />
        <Controller
          control={control}
          name="scjId"
          render={({ field }) => (
            <Input
              placeholder=""
              className="rounded-xl"
              type="text"
              {...field}
            />
          )}
        />

        {/* <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <PasswordInput
              requiredField
              className="rounded-xl"
              label="Password"
              error={errors.password?.message}
              {...field}
            />
          )}
        />
        <Controller
          control={control}
          name="confirmPassword"
          render={({ field }) => (
            <PasswordInput
              requiredField
              className="rounded-xl"
              label="Confirm password"
              error={errors.confirmPassword?.message}
              {...field}
            />
          )}
        /> */}

        <Button>button</Button>

        <hr className="h-[2px] bg-[#bcbab3]" />

        <div className=" flex gap-1 bg-inherit text-sm">
          <p className="bg-inherit">Already have an account?</p>
          {/* <Link href="sign-in" className="bg-inherit text-busanViolet">
            Sign-in here.
          </Link> */}
        </div>
      </form>
    </div>
  );
};

export default Register;
