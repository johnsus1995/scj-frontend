/* eslint-disable jsx-a11y/anchor-is-valid */
const AllExams = () => {
  return (
    <div className="flex flex-col clear-start">
      <h3 className="py-2 font-bold">Available Exams</h3>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Exam name
              </th>
              <th scope="col" className="px-6 py-3">
                Round
              </th>
              <th scope="col" className="px-6 py-3">
                Created by
              </th>
              <th scope="col" className="px-6 py-3">
                Deadline
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Score
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-100 even:dark:bg-gray-800 border-b dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Being Sealed-Verification Exam
              </th>
              <td className="px-6 py-4">15</td>
              <td className="px-6 py-4">Molly Jane</td>
              <td className="px-6 py-4">05-12-2024</td>
              <td className="px-6 py-4 text-green-500">Pass</td>
              <td className="px-6 py-4">91</td>
              <td className="px-6 py-4">
                <a
                  href="#"
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Edit
                </a>
              </td>
            </tr>
            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-100 even:dark:bg-gray-800 border-b dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Exam-2
              </th>
              <td className="px-6 py-4">14</td>
              <td className="px-6 py-4">Andrew Tate</td>
              <td className="px-6 py-4">23-10-2024</td>
              <td className="px-6 py-4 text-red-500">Fail</td>
              <td className="px-6 py-4">62</td>
              <td className="px-6 py-4">
                <a
                  href="/exams/1"
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  View
                </a>
              </td>
            </tr>
            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-100 even:dark:bg-gray-800 border-b dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Exam-3
              </th>
              <td className="px-6 py-4">14</td>
              <td className="px-6 py-4">Andrew Tate</td>
              <td className="px-6 py-4">23-10-2024</td>
              <td className="px-6 py-4 text-blue-500">New</td>
              <td className="px-6 py-4">62</td>
              <td className="px-6 py-4">
                <a
                  href="/exams/1"
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  View
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllExams;
