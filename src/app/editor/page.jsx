import React from "react";

import TiptapEditor from "../../components/TiptapEditor";

const EditorPage = () => {
  return (
    <div className="p-4">
      <h1 className="font-bold text-lg">Question. 1</h1>
      <TiptapEditor />
      <h1 className="font-bold text-lg">Answer. 1</h1>
      <TiptapEditor />
      <div className="flex gap-3 mt-2 w-fit ml-auto">
        <button className="bg-[#3D4BB0] py-1 px-4 rounded-lg text-white">
          Next
        </button>
        <button className="bg-[#3D4BB0] py-1 px-4 rounded-lg text-white">
          Next
        </button>
      </div>
    </div>
  );
};

export default EditorPage;
