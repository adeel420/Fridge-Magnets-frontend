"use client";

import { handleError, handleSuccess } from "@/app/utils";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState("");

  const handleLogin = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.warn("Token not found");
        return;
      }

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/user/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUser(response.data);
    } catch (err) {
      handleError("Login failed:", err.response?.data || err.message);
    }
  };

  const handleGet = async (userId) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/payment/${userId}`
      );
      setOrders(response.data);
    } catch (err) {
      handleError(err.response?.data?.message || err.message);
    }
  };

  useEffect(() => {
    if (user.id) {
      handleGet(user.id);
    }
  }, [user.id]);

  useEffect(() => {
    handleLogin();
  }, []);

  const handleCancel = async (id) => {
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/payment/${id}`
      );
      handleSuccess(response.data.message || "Order cancelled successfully");

      handleGet(user.id);
    } catch (err) {
      handleError(err.response?.data?.error || "Failed to cancel order");
    }
  };

  return (
    <div className="mt-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-center text-2xl sm:text-3xl font-bold text-[#dd492b]">
        Orders
      </h2>
      <div className="overflow-auto max-h-[75vh] custom-scrollbar rounded-xl shadow-lg border border-gray-200 bg-white mt-6">
        <table className="min-w-full text-sm text-left border-collapse">
          <thead>
            <tr className="bg-[#dd492b] text-white">
              <th className="p-3">#</th>
              <th className="p-3">Buyer</th>
              <th className="p-3">Phone No</th>
              <th className="p-3">Address</th>
              <th className="p-3">Status</th>
              <th className="p-3">Orders</th>
              <th className="p-3">Price</th>
              <th className="p-3">Payment</th>
            </tr>
          </thead>

          <tbody>
            {orders.length > 0 ? (
              orders.map((order, index) => (
                <React.Fragment key={order._id}>
                  <tr className="border-b hover:bg-orange-50 transition duration-200">
                    <td className="p-3 font-semibold text-gray-700">
                      {index + 1}
                    </td>
                    <td className="p-3">{order?.name || "N/A"}</td>
                    <td className="p-3">{order?.phone || "N/A"}</td>
                    <td className="p-3">{order?.address || "N/A"}</td>
                    <td className="p-3 capitalize">{order?.status}</td>
                    <td className="p-3">{order?.products?.length} item(s)</td>
                    <td className="p-3">
                      ₹ {(order?.payment?.amount / 100).toFixed(2)}
                    </td>
                    <td className="p-3 capitalize">{order?.payment?.status}</td>
                  </tr>

                  {order.products.map((product, pIndex) => (
                    <tr key={`${order._id}-${pIndex}`} className="bg-gray-50">
                      <td></td>
                      <td colSpan="7" className="p-3">
                        <div className="flex flex-wrap gap-4 border rounded-lg p-4">
                          {/* Product Images */}
                          <div className="flex gap-2 flex-wrap items-center">
                            {product?.images?.map((img, i) => (
                              <Image
                                key={i}
                                src={img}
                                alt={`product-${i}`}
                                height={56}
                                width={56}
                                className="w-14 h-14 object-cover border border-gray-300 rounded-md"
                              />
                            ))}
                          </div>

                          {/* Product Info */}
                          <div className="flex flex-col gap-1">
                            <div className="font-semibold text-[#dd492b] text-base">
                              {product?.product?.title || "No Title"}
                            </div>
                            <div className="text-gray-600 text-sm">
                              Size: {product?.size?.size || "N/A"}
                            </div>
                            <div className="text-gray-600 text-sm">
                              Price: ₹{product?.product?.price || "N/A"}
                            </div>

                            {/* Cancel Button */}
                            <button
                              disabled={[
                                "shipped",
                                "delivered",
                                "cancelled",
                              ].includes(order.status.toLowerCase())}
                              onClick={() => {
                                if (
                                  ![
                                    "shipped",
                                    "delivered",
                                    "cancelled",
                                  ].includes(order.status.toLowerCase())
                                ) {
                                  handleCancel(order._id);
                                }
                              }}
                              className={`mt-3 px-4 py-2 rounded text-sm font-medium transition-all ${
                                ["shipped", "delivered", "cancelled"].includes(
                                  order.status.toLowerCase()
                                )
                                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                                  : "bg-[#dd492b] hover:bg-[#b9371d] text-white"
                              }`}
                            >
                              Cancel Order
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-4 text-gray-500">
                  No orders here...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
