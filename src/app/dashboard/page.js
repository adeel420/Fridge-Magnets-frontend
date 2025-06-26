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
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sidebar */}
      <aside className="bg-[#dd492b] md:w-[10%] w-full md:h-screen h-auto flex md:flex-col flex-row items-center md:justify-start justify-around p-2 sticky top-0 z-10 overflow-x-auto custom-scrollbar no-scrollbar">
        {dashboardTabs.map((data) => (
          <div
            key={data.id}
            className="flex flex-col items-center m-1 cursor-pointer"
          >
            <button
              onClick={() => {
                setActiveTab(data.id);
                if (data.id === 9) handleLogout();
              }}
              className={`text-xl md:text-xl p-2 rounded-full transition cursor-pointer duration-300 ${
                activeTab === data.id
                  ? "bg-[#ccc] text-[#dd492b]"
                  : "text-white hover:bg-[#ccc] hover:text-[#952e75]"
              }`}
            >
              <data.logo />
            </button>
            <span className="text-xs md:text-xs text-white text-center">
              {data.text}
            </span>
          </div>
        ))}
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-white p-4 overflow-y-auto max-h-screen">
        {renderTabContent()}
      </main>
    </div>
  );
};

export default Page;
