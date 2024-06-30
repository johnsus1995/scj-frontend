import PrivateNavbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const PrivateLayout = ({ children }) => {
  return (
    <div className="flex flex-col">
      <PrivateNavbar className="sticky top-0 w-full" />
      <div className="">
        <div className=" max-w-[1400px] mx-auto flex justify-between">
          <div
            className="hidden md:block md:sticky top-[80px] border-r
           border-gray-300 h-[calc(100vh_-_80px)] 
           max-w-[100px] lg:min-w-[200px] flex-1
           "
          >
            <Image
              src="https://www.shincheonji.org/img/church_mark.6abf740.svg"
              height={100}
              width={100}
              alt="scj"
              className="mx-auto py-10 w-3/4"
            />
            <ul className="mt-3 flex flex-col gap-2">
              <Link
                href="exams"
                className="bg-busanViolet hover:bg-[#b7c1fd] hover:text-black text-white pl-2 py-1 rounded-l-lg"
              >
                Exams
              </Link>
              <Link
                href="my-exams"
                className="text-black pl-2 py-1 hover:bg-[#b7c1fd] rounded-l-lg"
              >
                My exams
              </Link>
              <Link
                href="#"
                className="text-black pl-2 py-1 hover:bg-[#b7c1fd] rounded-l-lg"
              >
                Logout
              </Link>
            </ul>
          </div>
          <div className="flex-[4] ">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default PrivateLayout;
