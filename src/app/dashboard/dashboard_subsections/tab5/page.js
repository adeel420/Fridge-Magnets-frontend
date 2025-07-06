"use client";

import { handleError, handleSuccess } from "@/app/utils";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BounceLoader } from "react-spinners";

const Page = () => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
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
    getProducts();
  }, []);

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/product/${id}`);
      handleSuccess("Product deleted successfully");
      getProducts();
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <div className="shadow-2xl min-h-full p-4 sm:p-6 rounded-3xl bg-white">
      <h1 className="text-center text-2xl sm:text-3xl font-bold text-[#333] mb-6">
        Delete Products
      </h1>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 overflow-y-auto max-h-[80vh] custom-scrollbar px-1 sm:px-2">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product._id}
              className="bg-white border border-gray-200 rounded-2xl shadow hover:shadow-lg transition duration-300 flex flex-col"
            >
              <Image
                src={product.images[0]?.url || "/default.jpg"}
                alt="Product"
                width={400}
                height={200}
                className="w-full h-[180px] sm:h-[200px] object-cover rounded-t-2xl"
              />

              <div className="p-4 flex flex-col flex-grow justify-between">
                <h2 className="text-lg font-semibold text-gray-800 mb-2 truncate">
                  {product.title}
                </h2>

                <p className="text-sm text-gray-600 mb-3 leading-snug">
                  <span className="font-medium">Description:</span>{" "}
                  {product?.description?.length > 70
                    ? `${product?.description?.slice(0, 70)}...`
                    : product.description}
                </p>

                <h3 className="text-base font-semibold text-gray-700 mb-3">
                  Price:{" "}
                  <span className="text-[#dd492b]">£{product.price}</span>
                </h3>

                <button
                  onClick={() => handleDeleteProduct(product._id)}
                  className="mt-auto bg-[#dc3545] hover:bg-[#b52d3b] text-white px-4 py-2 rounded-md text-sm font-semibold transition w-full"
                >
                  Delete Product
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-6 text-gray-500 rounded-md">
            No products found...
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
