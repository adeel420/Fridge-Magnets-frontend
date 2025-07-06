"use client";

import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { GrAnnounce } from "react-icons/gr";
import Tab1 from "@/app/my-account/tab1/page";
import Tab2 from "@/app/my-account/tab2/page";

const Page = () => {
  const [activeTab, setActiveTab] = useState("tab2");

  return (
    <div className="pt-40 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto flex flex-col md:flex-row gap-6">
      {/* Sidebar Buttons */}
      <div className="w-full md:w-1/4 flex flex-row md:flex-col justify-center items-center gap-4">
        {[
          { id: "tab1", label: "Profile", icon: <FaUser /> },
          { id: "tab2", label: "Orders", icon: <GrAnnounce /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center justify-center gap-2 px-4 py-2 w-full md:max-w-[180px] rounded border font-medium text-base sm:text-lg transition cursor-pointer ${
              activeTab === tab.id
                ? "bg-[#dd492b] text-white border-[#dd492b]"
                : "text-[#dd492b] border-[#dd492b] hover:bg-[#ffe9e3]"
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="w-full mt-4 md:w-3/4">
        {activeTab === "tab1" && (
          <>
            <Tab1 />
          </>
        )}
        {activeTab === "tab2" && (
          <>
            <Tab2 />
          </>
        )}
      </div>
    </div>
  );
};

export default Page;
