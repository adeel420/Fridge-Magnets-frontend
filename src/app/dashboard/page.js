"use client";
import { dashboardTabs } from "@/components/data/data";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { handleSuccess } from "@/app/utils/index";
import Tab1 from "@/app/dashboard/dashboard_subsections/tab1/page";
import Tab2 from "@/app/dashboard/dashboard_subsections/tab2/page";
import Tab3 from "@/app/dashboard/dashboard_subsections/tab3/page";
import Tab4 from "@/app/dashboard/dashboard_subsections/tab4/page";
import Tab5 from "@/app/dashboard/dashboard_subsections/tab5/page";
import Tab6 from "@/app/dashboard/dashboard_subsections/tab6/page";
import Tab7 from "@/app/dashboard/dashboard_subsections/tab7/page";
import Tab8 from "@/app/dashboard/dashboard_subsections/tab8/page";
import Tab9 from "@/app/dashboard/dashboard_subsections/tab9/page";

const Page = () => {
  const [activeTab, setActiveTab] = useState(0);
  const router = useRouter();

  const handleLogout = () => {
    handleSuccess("Go to homePage");
    setTimeout(() => {
      router.push("/");
    }, 1000);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return <Tab1 />;
      case 1:
        return <Tab2 />;
      case 2:
        return <Tab3 />;
      case 3:
        return <Tab4 />;
      case 4:
        return <Tab5 />;
      case 5:
        return <Tab6 />;
      case 6:
        return <Tab7 />;
      case 7:
        return <Tab8 />;
      case 8:
        return <Tab9 />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#f8f8f8]">
      {/* Sidebar */}
      <aside className="bg-[#dd492b] md:w-[12%] w-full md:h-screen h-auto flex md:flex-col flex-row md:items-center items-start justify-start md:justify-start p-3 md:py-8 sticky top-0 z-20 overflow-x-auto md:overflow-y-auto custom-scrollbar no-scrollbar shadow-md">
        <div className="flex md:flex-col flex-row md:space-y-4 space-x-4 md:space-x-0 w-full items-center md:items-center">
          {dashboardTabs.map((data) => (
            <div
              key={data.id}
              className="flex flex-col items-center justify-center gap-1"
            >
              <button
                onClick={() => {
                  setActiveTab(data.id);
                  if (data.id === 9) handleLogout();
                }}
                className={`p-3 rounded-full transition duration-300 shadow-md cursor-pointer ${
                  activeTab === data.id
                    ? "bg-white text-[#dd492b] scale-105"
                    : "text-white hover:bg-white hover:text-[#952e75]"
                }`}
              >
                <data.logo className="w-6 h-6" />
              </button>
              <span className="text-[10px] md:text-xs text-white text-center whitespace-nowrap">
                {data.text}
              </span>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-white p-4 md:p-8 overflow-y-auto max-h-screen transition-all duration-300">
        {renderTabContent()}
      </main>
    </div>
  );
};

export default Page;
