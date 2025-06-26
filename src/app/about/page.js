"use client";
import Image from "next/image";
import { Camera, Heart, Users, Award } from "lucide-react";
import { useState } from "react";
import { FAQs } from "@/components/data/data";

const Page = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <div className="pt-36 px-4 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="text-center pt-12 mb-16">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          About Photofy
        </h1>
        <div className="w-24 h-1 bg-[#E84C24] mx-auto mt-4"></div>
      </div>

      {/* Who We Are Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
        <div className="order-2 md:order-1">
          <div className="inline-block bg-[#ffe0d4] text-[#dd492b] px-4 py-1 rounded-full text-sm font-medium mb-4">
            Who We Are
          </div>
          <p className="text-lg text-gray-700 mb-6">
            At Photofy, we are a small business with a big passion for capturing
            life’s special moments.
          </p>
          <p className="text-lg text-gray-700 mb-8">
            Our unique approach combines creativity with memorable experiences,
            making every occasion special.
          </p>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <Camera className="text-[#dd492b]" size={20} />
              <span className="font-medium">Premium Quality</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="text-[#dd492b]" size={20} />
              <span className="font-medium">Passionate Team</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="text-[#dd492b]" size={20} />
              <span className="font-medium">Client Focused</span>
            </div>
          </div>
        </div>
        <div className="order-1 md:order-2 relative">
          <div className="aspect-square relative rounded-lg overflow-hidden shadow-xl">
            <Image
              src="https://res.cloudinary.com/dyyuwwbaq/image/upload/v1750951102/img-10_docysw.jpg"
              alt="Photofy team at work"
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg hidden md:block">
            <p className="text-3xl font-bold text-[#dd492b]">10+</p>
            <p className="text-gray-600">Years Experience</p>
          </div>
        </div>
      </div>

      {/* Our Mission Section */}
      <div className="bg-gray-50 rounded-2xl p-8 md:p-12 mb-20">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <div className="w-24 h-1 bg-[#E84C24] mx-auto "></div>
          <p className="text-lg text-gray-700 mt-6 mb-8">
            We believe that photographs are more than just images – they are
            treasured memories frozen in time. Our mission is to create stunning
            visual stories that you will cherish for generations to come.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-[#ffe0d4] text-[#dd492b] rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="text-[#dd492b]" />
              </div>
              <h3 className="font-bold text-xl mb-2">Excellence</h3>
              <p className="text-gray-600">
                Delivering exceptional quality in every photograph we take
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-[#ffe0d4] rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="text-[#dd492b]" />
              </div>
              <h3 className="font-bold text-xl mb-2">Passion</h3>
              <p className="text-gray-600">
                Bringing creativity and enthusiasm to every project
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-[#ffe0d4] rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-[#dd492b]" />
              </div>
              <h3 className="font-bold text-xl mb-2">Connection</h3>
              <p className="text-gray-600">
                Building relationships that help us capture your authentic
                moments
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-4 py-8" id="faqs">
        <h2 className="text-3xl font-bold mb-2 text-center">FAQS</h2>
        <div className="w-24 h-1 bg-[#E84C24] mx-auto "></div>
        <div className="space-y-4 mt-12">
          {FAQs.map((item, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex justify-between items-center bg-[#f24b1a] text-white px-4 py-3 text-left focus:outline-none"
              >
                <span className="text-lg font-medium">{item.title}</span>
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
                  className="px-4 py-3 bg-white text-gray-700"
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
