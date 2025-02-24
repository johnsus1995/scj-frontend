import { Link } from "react-router";

const Navbar = () => {
  return (
    <div className="bg-busanBlue flex justify-between p-4 text-white w-full sticky top-0 z-50">
      <Link to={"/"} className="font-semibold text-lg">
        BUSAN JAMES
      </Link>
      <nav className="flex gap-2">
        <Link to={""}>exams</Link>
        <Link to={""}>create</Link>
        <Link to={"/login"}>logout</Link>
      </nav>
    </div>
  );
};

export default Navbar;
