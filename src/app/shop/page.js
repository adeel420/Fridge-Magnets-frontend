"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { handleError } from "@/app/utils/index";
import Image from "next/image";

const Page = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGet = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/product`
      );
      setProducts(response.data);
    } catch (err) {
      handleError(err);
    }
  };

  useEffect(() => {
    handleGet();
  }, []);
  return (
    <div className="pt-28 px-4 pb-20 max-w-7xl mx-auto">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 text-center mt-12">
        Shop Now
      </h1>
      <div className="w-16 sm:w-20 h-1 bg-[#dd492b] mx-auto mt-4 mb-8 rounded"></div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:scale-[1.03] hover:shadow-2xl hover:border hover:border-[#dd492b] transition duration-300 cursor-pointer"
          >
            <a href={`/shop/${product._id}`}>
              {/* Image Container */}
              <div className="h-72 sm:h-80 flex items-center justify-center bg-[#f6f6f6]">
                <Image
                  src={product?.images[0]?.url}
                  alt="Product"
                  className="object-contain w-full h-full"
                  width={330}
                  height={320}
                />
              </div>

              {/* Content */}
              <div className="p-4 space-y-2">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                  {product.title}
                </h2>
                <p className="text-sm text-gray-500">From</p>
                <p className="text-xl sm:text-2xl font-bold text-[#dd492b]">
                  £{product.price}
                </p>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
