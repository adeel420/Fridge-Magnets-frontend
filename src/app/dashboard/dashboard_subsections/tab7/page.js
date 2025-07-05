"use client";

import { handleError } from "@/app/utils";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { IoPrint } from "react-icons/io5";

const Page = () => {
  const [orders, setOrders] = useState([]);
  const [input, setInput] = useState("");
  const [events, setEvents] = useState([]);

  const handleGet = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/payment`
      );
      setOrders(response.data);
    } catch (err) {
      handleError(err);
    }
  };

  const handleGetEvents = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/events-book/`
      );
      setEvents(response.data);
    } catch (err) {
      handleError(err);
    }
  };

  useEffect(() => {
    handleGet();
    handleGetEvents();
  }, []);

  const handlePrintImages = (order) => {
    const newWindow = window.open("", "_blank");
    if (!newWindow) return;

    const allImages = order.products
      .flatMap((product) => product.images || [])
      .map((img) => `<img src="${img}" style="width:200px;margin:10px;" />`)
      .join("");

    newWindow.document.write(`
    <html>
      <head>
        <title>Print Images</title>
      </head>
      <body onload="window.print();">
        ${allImages}
      </body>
    </html>
  `);
    newWindow.document.close();
  };

  const filteredItems = orders.filter((item) =>
    item?.buyer?.name?.toLowerCase().includes(input.toLowerCase())
  );

  const updateStatus = async (status, id) => {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/payment/${id}`,
        { status }
      );
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <div className="shadow-2xl h-full p-4 rounded-3xl w-full overflow-hidden bg-white">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <input
          type="text"
          className="border border-[#dd492b] p-2 rounded outline-none w-full sm:w-[300px]"
          placeholder="Search buyers..."
          onChange={(e) => setInput(e.target.value)}
          value={input}
        />
        <h1 className="text-2xl font-bold text-[#dd492b] text-center w-full sm:w-auto">
          All Orders
        </h1>
      </div>

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
            {filteredItems.length > 0 ? (
              filteredItems.map((order, index) => (
                <React.Fragment key={index}>
                  <tr
                    className="border-b border-gray-200 hover:bg-orange-50 transition"
                    key={order._id}
                  >
                    <td className="p-3 font-bold text-gray-700">{index + 1}</td>
                    <td className="p-3">{order?.buyer?.name || "N/A"}</td>
                    <td className="p-3">{order?.phone || "N/A"}</td>
                    <td className="p-3">{order?.address || "N/A"}</td>
                    <td className="p-3">
                      <select
                        defaultValue={order?.status}
                        onChange={(e) =>
                          updateStatus(e.target.value, order._id)
                        }
                        className={`p-1 rounded border border-gray-300 text-sm ${
                          order.status === "delivered"
                            ? "bg-green-100 text-green-700"
                            : order.status === "shipped"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="p-3">{order?.products?.length} item(s)</td>
                    <td className="p-3">
                      ₹{(order?.payment?.amount / 100).toFixed(2)}
                    </td>
                    <td className="p-3 capitalize">{order?.payment?.status}</td>
                  </tr>

                  {order?.products.map((product, pIndex) => (
                    <tr key={`${order._id}-${pIndex}`} className="bg-gray-50">
                      <td></td>
                      <td colSpan="7" className="p-3">
                        {" "}
                        {/* increased colSpan for new column */}
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
                                className="w-14 h-14 object-cover border border-gray-300 rounded-md"
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

                            <div className="mt-2 flex gap-2">
                              <button
                                onClick={() => handlePrintImages(order)}
                                className="bg-[transparent] text-[#dd492b] border border-[#dd492b] cursor-pointer px-3 py-1 rounded text-sm hover:bg-[#dd492b] hover:text-white "
                              >
                                <IoPrint />
                              </button>
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
                <td colSpan="8" className="text-center py-4 text-gray-500">
                  No orders here...
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <h1 className="text-2xl font-bold text-[#dd492b] text-center mb-4 mt-4 w-full sm:w-auto">
          Events Booked
        </h1>
        <table className="min-w-full border-collapse table-auto text-sm">
          <thead>
            <tr className="bg-[#dd492b] text-white text-left">
              <th className="p-3">#</th>
              <th className="p-3">name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Phone No</th>
              <th className="p-3">Event Type</th>
              <th className="p-3">Event Date</th>
              <th className="p-3">Event Location</th>
              <th className="p-3">Additional Info</th>
              <th className="p-3">Price</th>
              <th className="p-3">Payment</th>
            </tr>
          </thead>
          <tbody>
            {events.length > 0 ? (
              events.map((order, index) => (
                <React.Fragment key={index}>
                  <tr
                    className="border-b border-gray-200 hover:bg-orange-50 transition"
                    key={index}
                  >
                    <td className="p-3 font-bold text-gray-700">{index + 1}</td>
                    <td className="p-3">{order?.name || "N/A"}</td>
                    <td className="p-3">{order?.email || "N/A"}</td>
                    <td className="p-3">{order?.phone || "N/A"}</td>
                    <td className="p-3">{order?.eventType || "N/A"}</td>
                    <td className="p-3">{order?.eventDate || "N/A"}</td>
                    <td className="p-3">{order?.eventLocation || "N/A"}</td>
                    <td className="p-3">{order?.additionalInfo || "N/A"}</td>
                    <td className="p-3">₹{order?.payment?.amount || "N/A"}</td>
                    <td className="p-3">{order?.payment?.status || "N/A"}</td>
                  </tr>
                </React.Fragment>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="text-center py-4 text-gray-500">
                  No events here...
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
