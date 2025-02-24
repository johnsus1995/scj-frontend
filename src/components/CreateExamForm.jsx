import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { format } from "date-fns";
import { Button } from "./ui/button";
import { useMutation } from "@tanstack/react-query";
import { addNewExam } from "@/api/exam";
import { useToast } from "@/hooks/use-toast";

const schema = Yup.object().shape({
  title: Yup.string().required("Title is required!"),
  description: Yup.string().required("Description is required!"),
  deadline: Yup.date()
    .required("Deadline is required")
    .typeError("Invalid date format"),
  duration: Yup.string().required("Duration is required!"),
});

const CreateExamForm = () => {
  const { toast } = useToast();

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      deadline: new Date(),
      duration: "1",
    },
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: addNewExam,
    onSuccess: (res) => {
      reset();
      toast({
        title: "Success!",
        description: res?.message,
      });
    //   navigate("/");
    },
    onError: (res) => {
      toast({
        variant: "destructive",
        title: "Error!",
        description: res?.message,
      });
    },
  });

  const onSubmit = (data) => {
    const reqData = {
      title: data.title,
      description: data.description,
      deadline: format(new Date(data.deadline), "yyyy-MM-dd"),
      duration: data.duration,
      published: false,
    };
    mutate(reqData);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 pb-4 md:w-1/2"
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
        <Controller
          control={control}
          name="deadline"
          render={({ field }) => (
            <Input
              {...field}
              value={
                field.value ? format(new Date(field.value), "yyyy-MM-dd") : ""
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
              label="Duration (Hours)"
              className="rounded-none border border-gray-400"
              type="number"
              min={1}
              defaultValue={1}
              error={errors.duration?.message}
            />
          )}
        />
        <Button
          type="submit"
          disabled={isLoading}
          className="bg-busanBlue md:w-1/3 p-2 rounded-none text-white"
          isLoading={isLoading}
        >
          Add
        </Button>
      </form>
    </div>
  );
};

export default CreateExamForm;
