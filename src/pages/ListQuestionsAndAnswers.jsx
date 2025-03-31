import {
  getAllAttemptedAnswersOfExam,
  getAllQuestionsOfExam,
  startAttemptExam,
} from "@/api/exam";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router";

const ListQuestionsAndAnswers = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: questionData, isPending } = useQuery({
    queryKey: ["get-questions"],
    queryFn: () => getAllQuestionsOfExam({ id }),
  });

  const { data: attemptedAnswers, isPending: attemptedAnswersPending } =
    useQuery({
      queryKey: ["get-correct-answers"],
      queryFn: () => getAllAttemptedAnswersOfExam({ id }),
    });

  console.log(attemptedAnswers);

  const { mutate } = useMutation({
    mutationFn: startAttemptExam,
    onSuccess: (res) => {
      toast.success(res.message);
      navigate(
        `attempt?attempt_exam_id=${res.data.id}&&exam_title=${questionData?.data?.exam.title}`
      );
    },
    onError: () => {
      toast.error("error!");
    },
  });

  const onAttemptExam = () => {
    mutate({ id });
  };

  if (isPending) return <div>Loading...</div>;

  return (
    <div className="flex flex-col  items-center gap-4 ">
      <QuestionsAnswerList
        examTitle={questionData?.data?.exam.title}
        questions={questionData?.data?.questions}
        answers={attemptedAnswers?.data}
      />
      <div className="flex gap-2 ml-2 md:ml-4">
        <Link
          to={"/"}
          className="bg-busanBlue px-4 py-2 w-fit rounded-none text-white"
        >
          Go Back
        </Link>
        <Button
          onClick={onAttemptExam}
          className="bg-busanBlue px-4 py-2 w-fit rounded-none"
        >
          Attempt Exam
        </Button>
      </div>
    </div>
  );
};

export default ListQuestionsAndAnswers;

const ReadOnlyEditor = ({ content }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    editable: false,
  });

  if (!editor) {
    return <p>Loading...</p>;
  }

  return (
    <div className="editor max-h-[150px] !border-none !p-0">
      <EditorContent className="" editor={editor} />
    </div>
  );
};

const QuestionsAnswerList = ({ examTitle, questions, answers }) => {
  return (
    <div className="p-4">
      <div className="flex gap-2 text-xl  mb-4 font-thin">
        <span>Title: </span>
        <h2 className="underline">{examTitle}</h2>
      </div>
      <ol className="space-y-6 list-decimal pl-4">
        {questions.map((question) => {
          const answer = answers?.find((ans) => ans.questionId === question.id);
          return (
            <div key={question.id} className="flex justify-between">
              <li key={question.id} className="pb-0">
                <ReadOnlyEditor content={question.text} />
                {answer && (
                  <div className="mt-2 pl-4 border-l-4 border-gray-300 flex items-baseline gap-2">
                    <p className="font-semibold text-green-500">Ans.</p>
                    <ReadOnlyEditor content={answer.answerText} />
                  </div>
                )}
              </li>
              {!!answer && (
                <Link className=" text-busanBlue h-fit border border-busanBlue px-1 text-sm">
                  Edit Answer
                </Link>
              )}
            </div>
          );
        })}
      </ol>
    </div>
  );
};
