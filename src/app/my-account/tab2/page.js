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
    <div className="mt-12">
      <div className="overflow-auto max-h-[75vh] custom-scrollbar rounded-xl">
        <table className="min-w-full border-collapse table-auto text-sm">
          <thead>
            <tr className="bg-[#dd492b] text-white text-left">
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
                  <tr className="border-b border-gray-200 hover:bg-orange-50 transition">
                    <td className="p-3 font-semibold text-gray-700">
                      {index + 1}
                    </td>
                    <td className="p-3">{order?.buyer?.name || "N/A"}</td>
                    <td className="p-3">{order?.phone || "N/A"}</td>
                    <td className="p-3">{order?.address || "N/A"}</td>

                    <td className="p-3">{order?.status}</td>

                    <td className="p-3">{order?.products?.length} item(s)</td>
                    <td className="p-3">
                      ₹ {(order?.payment?.amount / 100).toFixed(2)}
                    </td>
                    <td className="p-3 capitalize">{order?.payment?.status}</td>
                  </tr>

                  {order?.products.map((product, pIndex) => (
                    <tr key={`${order._id}-${pIndex}`} className="bg-gray-50">
                      <td></td>
                      <td colSpan="6" className="p-3">
                        <div className="flex flex-wrap sm:flex-nowrap items-start gap-4 border border-gray-200 rounded-lg p-3">
                          {/* Images */}
                          <div className="flex gap-2 flex-wrap">
                            {product?.images?.map((img, i) => (
                              <Image
                                key={i}
                                src={img}
                                alt={`product-${i}`}
                                height={56}
                                width={56}
                                className="object-cover border border-gray-300 rounded-md"
                              />
                            ))}
                          </div>

                          {/* Product Info */}
                          <div className="flex flex-col gap-1">
                            <div className="font-semibold text-[#dd492b]">
                              {product?.product?.title || "No Title"}
                            </div>
                            <div className="text-gray-600 text-sm">
                              Size: {product?.size?.size || "N/A"}
                            </div>

                            <div className="text-gray-600 text-sm">
                              Price: ₹{product?.product?.price || "N/A"}
                            </div>
                            <div
                              className={`text-white text-sm p-2 w-[120px] rounded flex items-center justify-center ${
                                ["shipped", "delivered", "cancelled"].includes(
                                  order.status.toLowerCase()
                                )
                                  ? "bg-gray-400 cursor-not-allowed"
                                  : "bg-[#dd492b] hover:bg-[#b9371d] cursor-pointer"
                              }`}
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
                            >
                              Cancel Order
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
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
