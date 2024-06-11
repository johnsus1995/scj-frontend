"use client";

import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { EditorProvider } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { MenuBar } from "../components/tiptap/menubar";
import React from "react";

const TiptapEditor = () => {
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

  return (
    <EditorProvider
      slotBefore={<MenuBar />}
      extensions={extensions}
      content={content}
    ></EditorProvider>
  );
};

export default TiptapEditor;
