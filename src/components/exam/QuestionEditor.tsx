import { EditorContent } from '@tiptap/react';

import MenuBar from '@/components/tiptap/menubar';

interface QuestionProps {
  questionNumber: number;
  editor: any;
}

const QuestionEditor = (props: QuestionProps) => {
  const { questionNumber, editor } = props;

  return (
    <div>
      <h4 className="mb-2 font-semibold text-busanJames">
        Question-{questionNumber}
      </h4>
      <div className="editor">
        {editor && <MenuBar editor={editor} />}
        <hr />
        <EditorContent className="editor__content" editor={editor} />
      </div>
    </div>
  );
};

export default QuestionEditor;
