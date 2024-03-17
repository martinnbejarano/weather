/* eslint-disable react/prop-types */
import { useState } from "react";
import { IoMdClose } from "react-icons/io";

export const SideBar = ({ icon, content, title }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {!isOpen && <button onClick={() => setIsOpen(!isOpen)}>{icon}</button>}
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-20"></div>
      )}
      <div
        className={`flex flex-col space-y-2 p-4 fixed top-0 right-0 w-[75%] max-w-80 h-screen bg-[#13111c] shadow-2xl ${isOpen ? "translate-x-0" : "translate-x-full"} trasnform duration-200 z-30`}
      >
        <div className="flex justify-between items-center">
          <p className="text-xl font-bold">{title}</p>
          <button
            className="text-2xl hover:cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            <IoMdClose />
          </button>
        </div>
        {isOpen && <div>{content}</div>}
      </div>
    </>
  );
};
