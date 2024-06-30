import Link from "next/link";
import React from "react";

const AuthNavbar = () => {
  return (
    <nav className="flex items-center justify-between bg-[#3D4BB0] text-white p-4 h-[80px] ">
      <Link href="/editor" className="font-semibold bg-inherit">
        SCJ
      </Link>
      <ul className="flex gap-4 text-sm bg-inherit">
        <Link href="#" className="py-2 bg-inherit">
          About
        </Link>
        <Link href="exams" className="py-2  bg-inherit">
          JSS
        </Link>
        <Link
          href="/sign-up"
          className="bg-white text-black p-2 rounded-3xl px-3"
        >
          Sign-in
        </Link>
      </ul>
    </nav>
  );
};

export default AuthNavbar;
