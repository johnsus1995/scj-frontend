import Link from "next/link";
import React from "react";

const ExamDetail = (props) => {
  return (
    <div>
      <div className="bg-gray-300 flex flex-col md:flex-row justify-between px-4 md:px-8 lg:px-14">
        <div className="max-w-[800px]">
          <h1 className="font-bold text-xl my-2">
            SCJ Year 41 (12th Round) “Being Sealed” Verification Exam
          </h1>
          <p className="mb-2 text-sm">
            In publishing and graphic design, Lorem ipsum is a placeholder text
            commonly used to demonstrate the visual form of a document or a
            typeface without relying on meaningful content. Lorem ipsum may be
            used as a placeholder before the final copy is available.
          </p>
        </div>
        <div className="text-sm flex gap-2 md:flex-col mb-4 md:mt-2">
          <p className="font-semibold">
            Created by: <span className="font-normal">Sarah John</span>
          </p>
          <p className="font-semibold">
            Deadline <span className="font-normal">26-10-1995</span>
          </p>
          <p className="font-semibold">
            Submitted: <span className="font-normal">No</span>
          </p>
        </div>
      </div>
      <div className="mt-4 px-4 md:px-8 lg:px-14 flex gap-2">
        <button className="bg-busanViolet text-white text-sm p-2 px-4 rounded-lg">
          Back
        </button>

        <Link href="/exams/1/startExam" className="bg-busanViolet text-white text-sm p-2 px-4 rounded-lg">
          Start Test
        </Link>
      </div>
    </div>
  );
};

export default ExamDetail;
