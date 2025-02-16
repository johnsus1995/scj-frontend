import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { register } from "@/api/auth";
import { useToast } from "@/hooks/use-toast";

const schema = Yup.object().shape({
  scjId: Yup.number().required("Required!"),
  name: Yup.string().required("Required!"),
  email: Yup.string()
    .required("Email is required!")
    .matches(/^((\S+)@(\S+)\.(\S+))$/, {
      message: "Please enter a valid email address.",
      excludeEmptyString: false,
    }),
  password: Yup.string().required("Required!"),
  confirmPassword: Yup.string()
    .required("Required!")
    .test("passwords-match", "Passwords do not match", function (value) {
      return this.parent.password === value;
    }),
});

const Register = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      scjId: "",
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (d) => register(d),
    onSuccess: () => {
      reset();
      toast({
        title: "Success!",
        description: "New account created, please login now.",
      });
      navigate("/login");
    },
    onError: () => {
      //
    },
  });

  const onSubmit = (data) => {
    const reqData = {
      scjId: data.scjId,
      name: data.name,
      roleId: 1,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
      isAdmin: false,
    };
    mutate(reqData);
  };

  return (
    <div className="w-full max-w-[360px]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full "
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
              type="number"
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
          className="bg-busanBlue rounded-none w-1/3"
          isLoading={isPending}
        >
          Register
        </Button>
        <p className="text-sm">
          Already have an account?{" "}
          <Link
            to={"/login"}
            className="text-busanBlue underline font-semibold"
          >
            Login.
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
