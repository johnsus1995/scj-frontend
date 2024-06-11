import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="flex justify-between bg-[#3D4BB0] text-white p-4">
      <Link href="/editor">Scj</Link>
      <ul className="flex gap-2">
        <Link href="editor">editor</Link>
        <Link href="/questions">questions</Link>
      </ul>
    </nav>
  );
};

export default Navbar;
