import MenuBar from "@/components/tiptap/menubar";
import CharacterCount from "@tiptap/extension-character-count";
import Highlight from "@tiptap/extension-highlight";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import { EditorContent, useEditor } from "@tiptap/react";
import Placeholder from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";
import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { addCorrectAnswer, addQuestion } from "@/api/exam";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams, useSearchParams } from "react-router";
import { Input } from "@/components/ui/input";

const AttemptExam = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [searchParams] = useSearchParams();

  const examTitle = searchParams.get("examTitle");
  const questionNumber = searchParams.get("questionNumber");
  const answerNumber = searchParams.get("answerNumber");

  const [questionEditorContent, setQuestionEditorContent] = useState("");
  const [answerEditorContent, setAnswerEditorContent] = useState("");

  const { control, register, handleSubmit, getValues, reset } = useForm({
    defaultValues: {
      keywords: [{ keyword: "" }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "keywords",
  });

  const questionEditor = useEditor({
    extensions: [
      StarterKit.configure(),
      Placeholder.configure({
        placeholder: "Write something …",
      }),
      Highlight,
      TaskList,
      TaskItem,
      CharacterCount.configure({
        limit: 10000,
      }),
    ],
    onUpdate: ({ editor }) => {
      setQuestionEditorContent(editor.getHTML());
    },
  });

  const answerEditor = useEditor({
    extensions: [
      StarterKit.configure(),
      Placeholder.configure({
        placeholder: "Write something …",
      }),
      Highlight,
      TaskList,
      TaskItem,
      CharacterCount.configure({
        limit: 10000,
      }),
    ],
    onUpdate: ({ editor }) => {
      setAnswerEditorContent(editor.getHTML());
    },
  });

  const { mutate: mutateCorrectAnswer, isPending: isPendingCorrectAnswer } =
    useMutation({
      mutationFn: addCorrectAnswer,
      onSuccess: () => {
        toast.success("New question and correct answer added successfully!");
        navigate(
          `/exams/${id}/add-question-and-answer?examTitle=${examTitle}&&questionNumber=${
            Number(questionNumber) + 1
          }&&answerNumber=${Number(answerNumber) + 1}`
        );
        questionEditor?.commands.clearContent();
        answerEditor?.commands.clearContent();
        reset();
      },
      onError: () => {
        toast.error("Could not add correct answer!");
      },
    });

  const { mutate: mutateQuestion, isPending: isPendingQuestion } = useMutation({
    mutationFn: addQuestion,
    onSuccess: (res) => {
      const correctAnswer = {
        questionId: res?.data?.id,
        answerText: answerEditorContent,
        keywords: getValues("keywords").map((field) => field.keyword),
      };
      mutateCorrectAnswer(correctAnswer);
    },
    onError: () => {
      toast.error("Could not add question!");
    },
  });

  const onSubmit = () => {
    mutateQuestion({
      examId: Number(id),
      text: questionEditorContent,
    });
  };

  const onRemoveField = (index)=>{
    if(index === 0) toast.error("At least one keyword is required");
    else
    remove(index);
  }

  return (
    <div>
      <h1 className="ml-2 md:ml-4 font-bold text:lg md:text-2xl my-2 ">
        Exam Name: <span className="text-busanBlue">{examTitle}</span>
      </h1>

      {/* question editor */}
      <div>
        <h1 className="ml-2 md:ml-4 font-bold text-base md:text-lg">
          Question-({questionNumber})
        </h1>
        <div className="editor mx-2 md:mx-4 mt-2">
          {questionEditor && <MenuBar editor={questionEditor} />}
          <hr className="pb-2" />
          <EditorContent className="editor__content" editor={questionEditor} />
        </div>
      </div>
      {/* answer editor */}
      <div>
        <h1 className="ml-2 md:ml-4 font-bold text-base md:text-lg">Answer</h1>
        <div className="editor mx-2 md:mx-4 mt-2 min-h-[18rem]">
          {answerEditor && <MenuBar editor={answerEditor} />}
          <hr className="pb-2" />
          <EditorContent className="editor__content" editor={answerEditor} />
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
        <h2 className="text-xl font-bold">Add Answer Keywords</h2>

        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-2 items-center">
            <Input
              {...register(`keywords.${index}.keyword`)}
              placeholder={`keyword-${index + 1}`}
              className="rounded-none border border-gray-400"
              required
            />
            <button
              type="button"
              onClick={() => onRemoveField(index)}
              className="bg-red-500 text-white p-2 h-fit"
            >
              X
            </button>
          </div>
        ))}

        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={() => append({ keyword: "" })}
            className="bg-blue-500 text-white px-4 py-2 w-fit"
          >
            + Add Keyword
          </button>

          <Button
            type="submit"
            className="bg-busanBlue px-4 py-2 w-fit rounded-none"
            isLoading={isPendingQuestion || isPendingCorrectAnswer}
            disabled={isPendingQuestion || isPendingCorrectAnswer}
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AttemptExam;
