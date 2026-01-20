"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { handleError } from "@/app/utils/index";
import Image from "next/image";

const ShopContent = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("category");

  const handleGet = async () => {
    setLoading(true);
    try {
      let url = `${process.env.NEXT_PUBLIC_API_URL}/product`;
      if (categoryId) {
        url += `?category=${categoryId}`;
      }
      const response = await axios.get(url);
      setProducts(response.data);
      
      if (categoryId) {
        const categoryResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/category/${categoryId}`
        );
        setCategoryName(categoryResponse.data.name);
      } else {
        setCategoryName("");
      }
    } catch (err) {
      handleError(err.response?.data?.message || "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGet();
  }, [categoryId]);

  return (
    <div className="pt-38 px-4 pb-20 max-w-7xl mx-auto">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 text-center mt-12">
        {categoryName ? `${categoryName} Products` : "Shop Now"}
      </h1>
      <div className="w-16 sm:w-20 h-1 bg-[#dd492b] mx-auto mt-4 mb-8 rounded"></div>

      {loading ? (
        <h3 className="text-xl sm:text-2xl font-semibold text-[#dd492b] text-center mt-20 animate-pulse">
          Products are loading...
        </h3>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {products.length > 0 ? (
            products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:scale-[1.03] hover:shadow-2xl hover:border hover:border-[#dd492b] transition duration-300 cursor-pointer"
              >
                <Link href={`/shop/${product._id}`}>
                  <div className="h-72 sm:h-80 flex items-center justify-center bg-[#f6f6f6]">
                    <Image
                      src={product?.images[0]?.url}
                      alt="Product"
                      className="object-contain w-full h-full"
                      width={330}
                      height={320}
                    />
                  </div>
                  <div className="p-4 space-y-2">
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                      {product.title}
                    </h2>
                    <p className="text-sm text-gray-500">From</p>
                    <p className="text-xl sm:text-2xl font-bold text-[#dd492b]">
                      £{product.price}
                    </p>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">
                {categoryName ? `No products found in ${categoryName} category` : "No products found"}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const Page = () => {
  return (
    <Suspense fallback={
      <div className="pt-38 px-4 pb-20 max-w-7xl mx-auto">
        <h3 className="text-xl sm:text-2xl font-semibold text-[#dd492b] text-center mt-20 animate-pulse">
          Loading...
        </h3>
      </div>
    }>
      <ShopContent />
    </Suspense>
  );
};

export default Page;
