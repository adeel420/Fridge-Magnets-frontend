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
    <div className="shadow-2xl h-full p-4 rounded-3xl">
      {/* Products */}
      <h1 className="text-center text-2xl font-bold mb-6">Delete Products</h1>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 custom-scrollbar overflow-y-auto max-h-[80vh] px-2">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden w-full transition-transform hover:scale-[1.02]"
            >
              <Image
                src={product.images[0]?.url || "/default.jpg"}
                alt="Product"
                height={50}
                width={100}
                className="w-full h-48 sm:h-56 object-cover"
              />
              <div className="p-5">
                <h2 className="text-xl font-semibold mb-2 truncate">
                  {product.title}
                </h2>
                <p className="text-sm text-gray-400 mb-4">
                  <span className="font-semibold">Description:</span>{" "}
                  {product?.description.length > 70
                    ? `${product?.description?.slice(0, 70)}...`
                    : product.description}
                </p>
                <h2 className="text-lg font-semibold mb-2 truncate">
                  Price:{" "}
                  <span className="text-[#dd492b]">£{product.price}</span>
                </h2>
                <div className="flex flex-col sm:flex-row gap-3 sm:justify-between">
                  <button
                    onClick={() => handleDeleteProduct(product._id)}
                    className="cursor-pointer bg-[#dc3641] hover:bg-[#cc232d] text-white px-4 py-2 rounded text-center w-full text-sm transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h3 className="text-center bg-[pink] py-4 text-gray-500">
            No products found...
          </h3>
        )}
      </div>
    </div>
  );
};

export default Page;
