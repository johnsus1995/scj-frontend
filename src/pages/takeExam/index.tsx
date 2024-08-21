// show a modal with instructions first

import Answer from '@/components/exam/answer';
import Question from '@/components/exam/question';
import { Button } from '@/components/ui/button';

const content = `
<h2>
  Hi there,
</h2>
<p>
  this is a <em>basic</em> example of <strong>Tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
</p>
<ul>
  <li>
    one
  </li>
  <li>
    two
  </li>
</ul>`;

const TakeExam = () => {
  return (
    <div className="TakeExam">
      <h3 className="font-bold text-2xl py-4">Exam Title</h3>
      <Question question={content} questionNumber={1} />
      <Answer answerNum={1} className="mt-4" />
      <div className="flex gap-3 mt-4">
        <Button className="border-busanJames" variant="outline">
          Go Back
        </Button>
        <Button className=" bg-busanJames">Submit Answer</Button>
      </div>
    </div>
  );
};

export default TakeExam;
