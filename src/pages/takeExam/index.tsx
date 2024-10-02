// show a modal with instructions first

import { useState } from 'react';

import CharacterCount from '@tiptap/extension-character-count';
import Highlight from '@tiptap/extension-highlight';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';

import Question from '@/components/exam/QuestionEditor';
import { Button } from '@/components/ui/button';
import examApi from '@/features/todo/services/exam.api';
import { useExam } from '@/store/createExamStore';

const TakeExam = () => {
  const questionNum = useExam((state) => state.currentQuestionNumber);
  const updateQuestionNum = useExam((state) => state.setCurrentQuestionNumber);

  const [, setQuestionEditorContent] = useState<any>('');
  const [error, setError] = useState({
    question: '',
    answer: '',
  });
  const [newQuestion, setNewQuestion] = useState({
    loading: false,
    keyword1: '',
    score1: '',
    keyword2: '',
    score2: '',
    keyword3: '',
    score3: '',
  });

  const onChangeQuestionFields = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewQuestion((prev) => ({ ...prev, [name]: value }));
  };

  const questionEditorState: any = useEditor({
    editable: true,
    extensions: [
      StarterKit.configure(),
      Highlight,
      TaskList,
      TaskItem,
      CharacterCount.configure({
        limit: 10000,
      }),
    ],
    onUpdate: ({ editor }) => {
      setQuestionEditorContent(editor.getJSON());
      setError((prev) => ({ ...prev, question: '' }));
    },
  });

  const onClickSubmit = async () => {
    if (questionEditorState.isEmpty) {
      setError((prev) => ({ ...prev, question: 'Question can not be empty!' }));
      return;
    }
    // console.log(questionEditorState.getHTML())
    const qReqData = {
      examId: 1,
      question: questionEditorState.getHTML(),
    };

    const aReqData = {
      examId: 1,
      questionId: questionNum + 1,
      answer: JSON.stringify([
        {
          answer: newQuestion.keyword1,
          points: newQuestion.score1,
        },
        {
          answer: newQuestion.keyword2,
          points: newQuestion.score2,
        },
        {
          answer: newQuestion.keyword3,
          points: newQuestion.score3,
        },
      ]),
    };

    const requests = [
      examApi.addQuestion(qReqData),
      examApi.addCorrectAnswer(aReqData),
    ];

    await Promise.all(requests)
      .then((_responses: any) => {
        updateQuestionNum(questionNum + 1);
        toast.success('Question and answers are added.');
      })
      .catch((_err) => {
        toast.error('Something went wrong!');
      });
  };

  return (
    <div className="TakeExam">
      <h3 className="font-bold text-2xl py-4">Exam Title</h3>
      <Question questionNumber={questionNum} editor={questionEditorState} />
      {error.question && (
        <p className="text-red-500 text-xs font-semibold">{error.question}</p>
      )}

      <div className="mt-5">
        <h1 className="text-lg font-bold pb-2 text-gray-500">
          Answer keywords
        </h1>
        <div className="flex flex-col gap-2 flex-wrap">
          <div className="flex gap-2">
            <input
              type="text"
              value={newQuestion.keyword1}
              onChange={onChangeQuestionFields}
              name="keyword1"
              className="border border-gray-400 p-2 rounded-lg w-full"
              placeholder="keyword-1"
            />
            <input
              type="number"
              value={newQuestion.score1}
              onChange={onChangeQuestionFields}
              name="score1"
              className="border border-gray-400 p-2 rounded-lg w-full"
              placeholder="Score"
              min={0}
            />
          </div>
          <div className="flex gap-2">
            <input
              name="keyword2"
              value={newQuestion.keyword2}
              onChange={onChangeQuestionFields}
              type="text"
              className="border border-gray-400 p-2 rounded-lg w-full"
              placeholder="keyword-2"
            />
            <input
              name="score2"
              onChange={onChangeQuestionFields}
              type="number"
              value={newQuestion.score2}
              className="border border-gray-400 p-2 rounded-lg w-full"
              placeholder="Score"
              min={0}
            />
          </div>
          <div className="flex gap-2">
            <input
              name="keyword3"
              value={newQuestion.keyword3}
              onChange={onChangeQuestionFields}
              type="text"
              className="border border-gray-400 p-2 rounded-lg w-full"
              placeholder="keyword-3"
              min={0}
            />
            <input
              name="score3"
              value={newQuestion.score3}
              onChange={onChangeQuestionFields}
              type="number"
              className="border border-gray-400 p-2 rounded-lg w-full"
              placeholder="Score"
              min={0}
            />
          </div>
        </div>
      </div>

      <div className="flex gap-3 mt-4">
        <Link to={'/exams'}>
          <Button
            className="border-busanJames text-busanJames"
            variant="outline"
          >
            Go Back
          </Button>
        </Link>
        <Button className=" bg-busanJames" onClick={onClickSubmit}>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default TakeExam;
