import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

interface QuestionProps {
  questionNumber: number;
  question: string;
}

const Question = (props: QuestionProps) => {
  const { questionNumber, question } = props;
  const editor = useEditor({
    editable: false,
    content: question,
    extensions: [StarterKit.configure()],
  });

  return (
    <div>
      <h4 className="mb-2 font-semibold text-busanJames">
        Question-{questionNumber}
      </h4>
      <div className="editor">
        <EditorContent className="editor__content" editor={editor} />
      </div>
    </div>
  );
};

export default Question;
