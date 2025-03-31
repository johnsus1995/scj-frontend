import MenuBar from "@/components/tiptap/menubar";
import CharacterCount from "@tiptap/extension-character-count";
import Highlight from "@tiptap/extension-highlight";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import { EditorContent, useEditor } from "@tiptap/react";
import Placeholder from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Link, useNavigate, useParams, useSearchParams } from "react-router";
import { attemptAnswer, getNextQuestion } from "@/api/exam";

const AttemptExam = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const { id } = useParams();
  const attempt_exam_id = searchParams.get("attempt_exam_id");
  const questionId = searchParams.get("questionId");
  const exam_title = searchParams.get("exam_title");

  const [questionEditorContent, setQuestionEditorContent] = useState("");
  const [answerEditorContent, setAnswerEditorContent] = useState("");

  const questionEditor = useEditor({
    content: "",
    editable: false,
    extensions: [
      StarterKit.configure(),
      Placeholder.configure({
        placeholder: "Write something …",
      }),
      Highlight,
      TaskList,
      TaskItem,
    ],
    onUpdate: ({ editor }) => {
      setQuestionEditorContent(editor.getHTML());
    },
  });

  const answerEditor = useEditor({
    extensions: [
      StarterKit.configure(),
      Placeholder.configure({
        placeholder: "Write your answer …",
      }),
      Highlight,
      TaskList,
      TaskItem,
      CharacterCount.configure({
        limit: 1000,
      }),
    ],
    onUpdate: ({ editor }) => {
      setAnswerEditorContent(editor.getHTML());
    },
  });

  const { mutate: getQuestion } = useMutation({
    mutationFn: getNextQuestion,
    onSuccess: (res) => {
      if (res.lastQuestionDone) return navigate(`/exams/${id}`);

      setSearchParams({
        ...searchParams,
        exam_title,
        attempt_exam_id,
        questionId: res.question.id,
      });
      questionEditor.commands.setContent(res.question.text);
    },
    onError: (err) => {
      toast.error(err?.message);
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: attemptAnswer,
    onSuccess: (res) => {
      toast.success(res.message);
      getQuestion({
        examId: id,
        attemptedExamId: attempt_exam_id,
      });

      answerEditor?.commands.clearContent();
    },
    onError: () => {
      toast.error("error!");
    },
  });

  const onSubmit = () => {

    if(answerEditor.isEmpty) return toast.error("Answer is required!");
    
    mutate({
      attemptExamId: attempt_exam_id,
      questionId,
      answerText: answerEditor.getHTML(),
    });
  };

  useEffect(() => {
    getQuestion({
      examId: id,
      attemptedExamId: attempt_exam_id,
    });
  }, []);

  return (
    <div>
      <h1 className="ml-2 md:ml-4 font-thin text:lg md:text-2xl my-2 ">
        Exam Name:{" "}
        <span className="text-busanBlue font-semibold">{exam_title}</span>
      </h1>

      {/* question editor */}
      <div>
        <h1 className="ml-2 md:ml-4 font-thin text-base md:text-lg">
          Question
        </h1>
        <div className="editor not-editable mx-2 md:mx-4 mt-2">
          <EditorContent className="editor__content" editor={questionEditor} />
        </div>
      </div>
      {/* answer editor */}
      <div className="mt-10">
        <h1 className="ml-2 md:ml-4 font-thin text-base md:text-lg">Answer</h1>
        <div className="editor mx-2 md:mx-4 mt-2 min-h-[18rem]">
          {answerEditor && <MenuBar editor={answerEditor} />}
          <hr className="pb-2" />
          <EditorContent className="editor__content" editor={answerEditor} />
        </div>
      </div>

      <div className="ml-2 md:ml-4 mt-2 md:mt-4 flex gap-2">
        <Button
          onClick={onSubmit}
          className="bg-busanBlue px-4 py-2 w-fit rounded-none "
          isLoading={isPending}
        >
          Save
        </Button>
        <Link
          className=" px-4 py-2 w-fit rounded-none font-semibold  text-busanBlue"
          to={`/exams/${id}`}
        >
          Cancel
        </Link>
      </div>
    </div>
  );
};

export default AttemptExam;
