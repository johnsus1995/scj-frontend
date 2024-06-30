import React from "react";
import { CircleCheckBig } from "lucide-react";
import { Ban } from 'lucide-react';

const Exams = () => {
  return (
    <div className="max-w-[1250px] mt-4 ml-4">
      <h1 className="font-bold text-xl">Exams Available</h1>
      <div className="mt-4 flex flex-col gap-4">
        <Exam />
        <Exam />
      </div>
    </div>
  );
};

export default Exams;

export const Exam = (props) => {
  const { title, desc, deadline, createdBy, submitted } = props;
  return (
    <div className="flex items-center gap-4 border border-gray-300 p-2 rounded-xl bg-[#e7e4d6] hover:bg-[#4955a4] cursor-pointer">
      <div className=" flex flex-col items-center min-w-[80px] ">
        <p className="bg-black text-white p-1 rounded-t-lg text-xs w-full text-center font-semibold">
          Sept
        </p>
        <p className="bg-white w-full text-center font-extrabold text-5xl">
          26
        </p>
        <p className="bg-black text-white p-1 rounded-b-lg text-xs w-full text-center font-semibold">
          2024
        </p>
      </div>
      <div className="bg-white  rounded-lg w-full ">
        <p className="text-base font-semibold p-2 px-3">Exam title</p>
        <p className="text-gray-500 text-sm px-3">
          It was popularized in the 1960s
        </p>

        <hr className="h-[1px] my-1 bg-[#bcbab3]" />

        <div className="flex justify-between text-xs p-2 px-3">
          <div className="flex gap-4">
            <p className="">
              Deadline: <span className="text-red-500">14-May-2024</span>
            </p>
            <p>
              Created by: <span className="text-blue-600">John</span>
            </p>
          </div>
          <CircleCheckBig className="h-6 w-6 text-green-500" />
        </div>
      </div>
    </div>
  );
};
