import { HeartIcon } from "@heroicons/react/solid";
import React from "react";

function Header({ title }) {
  return (
    <>
      <div className=" bg-gradient-to-b from-sombe-400 to-sombe-300 px-4 py-3  md:mt-2 flex flex-col-reverse md:flex-row md:justify-between justify-center items-center">
        <h3 className="text-white text-4xl">{title}</h3>
        <img src="laugh.png" className="h-14 md:h-20" alt="" />
        <div className="hidden md:flex items-center text-xl text-white ">
          <h3 className="mr-3">Welcome, BrainGhost</h3>
          <HeartIcon className="h-7 w-7  text-white" />
        </div>
      </div>
      <div className="flex justify-between px-4 py-2 text-xl md:hidden">
        <h3>Welcome, </h3>
        <HeartIcon className="h-6 w-6 text-sombe-400" />
      </div>
    </>
  );
}

export default Header;
