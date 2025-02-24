import CreateExamForm from "@/components/CreateExamForm";

const CreateExam = () => {
  return (
    <div className="flex flex-col gap-2 md:gap-4 md:border-l border-gray-300 p-4">
      <h4 className="font-bold text-xl">Add New Exam</h4>
      <h4 className="font-bold text-md text-gray-500">Instructions</h4>
      <ul className="text-sm text-gray-500 list-disc ml-8">
        <li>
          {" "}
          When a an exam is created you will be asked to fill questions and its
          correct answers.
        </li>
        <li>The Questions are in rich-text format.</li>
        <li>The answers are of keywords.</li>
        <li>
          you can create a question and sub-questions and add keywords and its
          points.
        </li>
        <li> sum of the points will be the total score of the question.</li>
      </ul>
      <CreateExamForm />
    </div>
  );
};

export default CreateExam;
