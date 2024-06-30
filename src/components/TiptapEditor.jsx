"use client";

import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { MenuBar } from "../components/tiptap/menubar";
import React, { useEffect, useState } from "react";

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
      HTMLAttributes: {
        class: "list-disc",
      },
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
      HTMLAttributes: {
        class: "list-decimal",
      },
    },
  }),
];

const content = ``;

const TiptapEditor = () => {
  const [editorContent, setEditorContent] = useState("");

  const editor = useEditor({
    extensions,
    content,
    onUpdate: ({ editor }) => {
      setEditorContent(editor.getJSON()); 
    },
  });

  const onClick = () => {
    if (editor) {
      console.log(editor.getHTML()); // Log the editor content
    }
  };

  return (
    <div>
      <MenuBar editor={editor} /> {/* Pass the editor instance to MenuBar */}
      <EditorContent editor={editor} /> {/* Render the editor content */}
      <button onClick={onClick}>Click Me</button>
    </div>
  );
};

export default TiptapEditor;
