import { Link } from 'react-router-dom';

const LeftSidebar = () => {
  return (
    <div
      className="sticky  top-16 h-48
        w-48"
    >
      <ul className="list-none pt-4  font-semibold text-busanJames flex flex-col gap-4">
        <li>
          <Link to="#">Create Exam</Link>
        </li>
        <li>
          <Link to="#">Exams</Link>
        </li>
        <li>
          <Link to="#">Members</Link>
        </li>
      </ul>
    </div>
  );
};

export default LeftSidebar;
