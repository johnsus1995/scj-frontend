import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

const PrivateNavbar = (props) => {
  const { className } = props;
  return (
    <div
      className={cn(
        " bg-[#3D4BB0] text-white  ",
        className
      )}
    >
      <nav className="max-w-[1400px] mx-auto h-[80px] flex justify-between items-center ">
        <Link href="/editor" className="font-semibold ">
          SCJ
        </Link>
        <ul className="flex gap-4 text-sm ">
          {/* <Link href="#" className=" ">
          About
        </Link> */}
          <Link href="exams" className="  ">
            Exams
          </Link>
          <Link href="/sign-up" className=" ">
            My account
          </Link>
        </ul>
      </nav>
    </div>
  );
};

export default PrivateNavbar;
