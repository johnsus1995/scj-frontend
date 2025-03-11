import { getAllQuestionsOfExam, startAttemptExam } from "@/api/exam";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router";

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

const QuestionsAnswerList = ({ data, answers }) => {
  return (
    <div className="p-4">
      {/* <h2 className="text-xl font-bold mb-4">{data.exam.title}</h2> */}
      <ol className="space-y-6 list-decimal pl-4">
        {data.map((question) => {
          const answer = answers.find((ans) => ans.id === question.id);
          return (
            <li key={question.id} className="pb-0">
              <ReadOnlyEditor content={question.text} />
              {answer && (
                <div className="mt-2 pl-4 border-l-4 border-gray-300 flex items-baseline gap-2">
                  <p className="font-semibold text-green-500">Ans.</p>
                  <ReadOnlyEditor content={answer.text} />
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
};

const answerResponse = {
  code: 200,
  message: "Listing questions",
  data: {
    exam: {
      id: 27,
      createdBy: 29,
      title: "my test exam",
    },
    questions: [
      {
        id: 45,
        examId: 27,
        text: "<h3>main answer1?</h3><ol><li><p>How does Lorem Ipsum help in design and development?</p></li><li><p>Can you provide an example of a typical Lorem Ipsum paragraph?</p></li></ol>",
      },
      {
        id: 46,
        examId: 27,
        text: "<p>this is main answer2</p>",
      },
      {
        id: 47,
        examId: 27,
        text: "<h3>this is main answer3.</h3><ol><li><p>Why is font selection important for accessibility?</p></li><li><p>What are the common challenges in typography for mobile devices?</p></li></ol>",
      },
    ],
  },
  success: true,
};

const ListQuestionsAndAnswers = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: questionData, isPending } = useQuery({
    queryKey: ["get-questions"],
    queryFn: () => getAllQuestionsOfExam({ id }),
  });

  const { mutate } = useMutation({
    mutationFn: startAttemptExam,
    onSuccess: (res) => {
      toast.success(res.message);
      navigate(`attempt?attemptExamId=${res.data.id}`);
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
        data={questionData?.data?.questions}
        answers={answerResponse.data.questions}
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
