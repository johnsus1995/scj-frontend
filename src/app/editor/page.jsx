"use client";

import MenuBar from "@/components/tiptap/menubar";
import CharacterCount from "@tiptap/extension-character-count";
import Highlight from "@tiptap/extension-highlight";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useState } from "react";

export default function Editor() {
  const [editorContent, setEditorContent] = useState("");

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

  const onClick = () => {
    if (editor) {
      console.log(editor.getHTML());
    }
  };

  return (
    <div className="editor">
      {editor && <MenuBar editor={editor} />}
      <EditorContent className="editor__content mt-4 md:mt-6" editor={editor} />
      <button onClick={onClick}>log editor</button>
    </div>
  );
}
