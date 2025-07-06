"use client";

import { handleError, handleSuccess } from "@/app/utils";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Page = () => {
  const [events, setEvents] = useState([]);

  const getEvents = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/events`
      );
      setEvents(response.data);
    } catch (err) {
      handleError(err);
    }
  };

  const handleDeleteEvent = async (id) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/events/${id}`);
      handleSuccess("Event deleted successfully");
      getEvents(); // Refresh the list
    } catch (err) {
      handleError(err);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <div className="shadow-2xl min-h-full p-4 sm:p-6 rounded-3xl bg-white">
      <h1 className="text-center text-2xl sm:text-3xl font-bold text-[#333] mt-8 mb-6">
        Update Events
      </h1>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 overflow-y-auto max-h-[80vh] custom-scrollbar px-1 sm:px-2">
        {events.length > 0 ? (
          events.map((event) => (
            <div
              key={event._id}
              className="bg-white border border-gray-200 rounded-2xl shadow hover:shadow-md transition-transform duration-200 overflow-hidden flex flex-col"
            >
              <Image
                src={event.image || "/default.jpg"}
                alt="Event"
                width={400}
                height={200}
                className="w-full h-[180px] sm:h-[200px] object-cover rounded-t-2xl"
              />

              <div className="p-4 flex flex-col justify-between flex-grow">
                <h2 className="text-lg font-semibold text-gray-800 mb-2 truncate">
                  {event.title}
                </h2>

                <p className="text-sm text-gray-600 mb-3 leading-snug">
                  <span className="font-medium">Description:</span>{" "}
                  {event.description?.length > 70
                    ? `${event.description.slice(0, 70)}...`
                    : event.description}
                </p>

                <div className="flex flex-col sm:flex-row gap-3 sm:justify-between mt-auto">
                  <Link
                    href={`/dashboard/dashboard_subsections/tab6/${event._id}`}
                    className="bg-[#fec204] hover:bg-[#d3a203] text-black text-sm font-medium px-4 py-2 rounded-md text-center transition w-full sm:w-auto"
                  >
                    Update
                  </Link>
                  <button
                    onClick={() => handleDeleteEvent(event._id)}
                    className="bg-[#dc3641] hover:bg-[#b72b35] text-white text-sm font-medium px-4 py-2 rounded-md transition w-full sm:w-auto"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-6 text-gray-500 rounded-md">
            No events found...
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
