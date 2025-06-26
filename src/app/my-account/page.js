"use client";

import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { GrAnnounce } from "react-icons/gr";
import Tab1 from "@/app/my-account/tab1/page";
import Tab2 from "@/app/my-account/tab2/page";

const Page = () => {
  const [activeTab, setActiveTab] = useState("tab2");

  return (
    <div className="pt-40 px-4 max-w-7xl mx-auto flex flex-col md:flex-row gap-6">
      {/* Buttons */}
      <div className="w-full md:w-[25%] flex md:flex-col justify-center items-center gap-4">
        <button
          className={`flex items-center text-base md:text-xl p-2 cursor-pointer w-full md:max-w-[180px] justify-center gap-2 border rounded transition ${
            activeTab === "tab1"
              ? "bg-[#dd492b] text-white border-[#dd492b]"
              : "text-[#dd492b] border-[#dd492b]"
          }`}
          onClick={() => setActiveTab("tab1")}
        >
          <FaUser /> Profile
        </button>
        <button
          className={`flex items-center text-base md:text-xl p-2 cursor-pointer w-full md:max-w-[180px] justify-center gap-2 border rounded transition ${
            activeTab === "tab2"
              ? "bg-[#dd492b] text-white border-[#dd492b]"
              : "text-[#dd492b] border-[#dd492b]"
          }`}
          onClick={() => setActiveTab("tab2")}
        >
          <GrAnnounce /> Orders
        </button>
      </div>

      {/* Content */}
      <div className="w-full md:w-[75%]">
        {activeTab === "tab1" && (
          <>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center pt-6 text-gray-800">
              Update Password
            </h1>
            <div className="w-20 sm:w-24 h-1 bg-[#E84C24] mx-auto mt-4"></div>
            <Tab1 />
          </>
        )}
        {activeTab === "tab2" && (
          <>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center pt-6 text-gray-800">
              Orders
            </h1>
            <div className="w-20 sm:w-24 h-1 bg-[#E84C24] mx-auto mt-4"></div>
            <Tab2 />
          </>
        )}
      </div>
    </div>
  );
};

export default Page;
