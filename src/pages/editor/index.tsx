/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';

import CharacterCount from '@tiptap/extension-character-count';
import Highlight from '@tiptap/extension-highlight';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { partial_ratio } from 'fuzzball';
import { convert } from 'html-to-text';

import MenuBar from '@/components/tiptap/menubar';

export default function Editor() {
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

  function evaluateAnswer(
    plainText: any,
    correctAnswer: string,
    threshold = 80,
  ) {
    const correctWords = correctAnswer.toLowerCase().split(/\s+/);

    // Check if each word in the correct answer is present in the student's answer
    const matches = correctWords.map((word) => {
      const bestMatch = plainText
        .toLowerCase()
        .split(/\s+/)
        .reduce((best: any, studentWord: any) => {
          const similarity = partial_ratio(word, studentWord);
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return
          return similarity > best ? similarity : best;
        }, 0);
      return bestMatch >= threshold;
    });

    // Consider the answer correct if all key words are present
    return matches.every((match) => match);
  }

  const onClick = () => {
    if (editor) {
      const html = editor.getHTML();
      const plainText: any = convert(html, {
        wordwrap: false,
      });
      // console.log(plainText);
      // console.log(evaluateAnswer(plainText, 'droupadi murmu', 70));
    }
  };

  return (
    <>
      <div>
        <h1 className="text-lg font-bold pb-2 ">Question-1</h1>
      </div>
      <div className="editor">
        {editor && <MenuBar editor={editor} />}
        <hr />
        <EditorContent className="editor__content" editor={editor} />
      </div>
      <button
        onClick={onClick}
        className="bg-gray-300 p-2 my-2 w-52 rounded-lg"
      >
        Submit
      </button>

      <div>
        <h1 className="text-lg font-bold pb-2 text-gray-500">
          Answer keywords
        </h1>
        <div className="flex flex-col gap-2 flex-wrap">
          <input
            type="text"
            className="border border-gray-400 p-2 rounded-lg"
            placeholder="keyword-1"
          />
          <input
            type="text"
            className="border border-gray-400 p-2 rounded-lg"
            placeholder="keyword-2"
          />
          <input
            type="text"
            className="border border-gray-400 p-2 rounded-lg"
            placeholder="keyword-3"
          />
        </div>
      </div>
    </>
  );
}
