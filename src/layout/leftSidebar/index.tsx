import { Link } from 'react-router-dom';

const LeftSidebar = () => {
  return (
    <div
      className="sticky  top-16 h-48
        w-48"
    >
      <ul className="list-none pt-4  font-semibold text-busanJames flex flex-col gap-4 w-full">
        <li className="w-full">
          <Link
            to="#"
            className="hover:bg-busanJames hover:text-white p-1 block rounded w-full"
          >
            Create Exam
          </Link>
        </li>
        <li>
          <Link
            to="#"
            className="hover:bg-busanJames hover:text-white p-1 block rounded w-full"
          >
            Exams
          </Link>
        </li>
        <li>
          <Link
            to="#"
            className="hover:bg-busanJames hover:text-white p-1 block rounded w-full"
          >
            Members
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default LeftSidebar;
