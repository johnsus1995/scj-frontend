import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/api/auth";
import { useToast } from "@/hooks/use-toast";

const schema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required!")
    .matches(/^((\S+)@(\S+)\.(\S+))$/, {
      message: "Please enter a valid email address.",
      excludeEmptyString: false,
    }),
  password: Yup.string().required("Required!"),
});

const Login = () => {
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
      email: "",
      password: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (d) => login(d),
    onSuccess: (res) => {
      reset();
      toast({
        title: "Success!",
        description: res?.message,
      });
      localStorage.setItem("scjAuthToken",res.data.token)
      navigate("/");
    },
    onError: (res) => {
      toast({
        variant:"destructive",
        title: "Error!",
        description: res?.message,
      });
    },
  });

  const onSubmit = (data) => {
    const reqData = {
      email: data.email,
      password: data.password,
    };
    mutate(reqData);
  };

  return (
    <div className="w-full max-w-[360px]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full "
      >
        <h2 className="font-bold text-xl">Login</h2>

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

        <Button
          className="bg-busanBlue rounded-none w-1/3"
          isLoading={isPending}
        >
          Login
        </Button>
        <p className="text-sm">
          Don&apos;t have an account?{" "}
          <Link
            to={"/register"}
            className="text-busanBlue underline font-semibold"
          >
            Register.
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
