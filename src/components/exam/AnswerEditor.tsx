import { EditorContent } from '@tiptap/react';

import MenuBar from '@/components/tiptap/menubar';

interface QuestionProps {
  answerNum: number;
  editor: any;
  className?: string;
}

const AnswerEditor = (props: QuestionProps) => {
  const { answerNum, editor, className } = props;

  return (
    <div className={className}>
      <h4 className="mb-2 font-semibold text-busanJames">Answer-{answerNum}</h4>
      <div className="editor">
        {editor && <MenuBar editor={editor} />}
        <hr />
        <EditorContent className="editor__content" editor={editor} />
      </div>
    </div>
  );
};

export default AnswerEditor;
