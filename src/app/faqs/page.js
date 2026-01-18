"use client";
import React, { useState } from "react";
import { FAQs } from "@/components/data/data";

const Page = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="pt-36 px-4 max-w-7xl mx-auto">
      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-4 py-12" id="faqs">
        <h2 className="text-3xl font-bold mb-3 text-center text-gray-900">
          FAQs
        </h2>

        <div className="w-24 h-1 bg-[#E84C24] mx-auto rounded-full"></div>

        <div className="space-y-5 mt-12">
          {FAQs.map((item, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-xl overflow-hidden shadow-sm"
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex justify-between items-center bg-[#E84C24] text-white px-5 py-4 text-left focus:outline-none hover:bg-[#d9441f] transition-colors"
              >
                <span className="text-base md:text-lg font-semibold">
                  {item.title}
                </span>

                <svg
                  className={`w-5 h-5 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {openIndex === index && (
                <div
                  className="px-5 py-4 bg-white text-gray-700 text-sm md:text-base leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: item.content }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
