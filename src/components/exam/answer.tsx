/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';

import CharacterCount from '@tiptap/extension-character-count';
import Highlight from '@tiptap/extension-highlight';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

// import { partial_ratio } from 'fuzzball';
// import { convert } from 'html-to-text';
import MenuBar from '@/components/tiptap/menubar';

interface QuestionProps {
  answerNum: number;
  answer?: string;
  className?: string;
}

const Answer = (props: QuestionProps) => {
  const { answerNum, answer, className } = props;
  const [editorContent, setEditorContent] = useState<any>('');

  const editor = useEditor({
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
      setEditorContent(editor.getJSON());
    },
  });

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

export default Answer;
