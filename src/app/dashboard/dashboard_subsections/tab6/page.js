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
    <div className="shadow-2xl h-full p-4 rounded-3xl">
      <h1 className="text-center text-2xl font-bold mt-12 mb-6">
        Update Events
      </h1>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 custom-scrollbar overflow-y-auto max-h-[80vh] px-2">
        {events.length > 0 ? (
          events.map((event) => (
            <div
              key={event._id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden w-full transition-transform hover:scale-[1.02]"
            >
              <Image
                src={event.image || "/default.jpg"}
                alt="Event"
                height={50}
                width={100}
                className="w-full h-48 sm:h-56 object-cover"
              />
              <div className="p-5">
                <h2 className="text-xl font-semibold mb-2 truncate">
                  {event.title}
                </h2>

                <p className="text-sm text-gray-400 mb-4">
                  <span className="font-semibold">Description:</span>{" "}
                  {event.description?.length > 70
                    ? `${event.description.slice(0, 70)}...`
                    : event.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:justify-between">
                  <Link
                    href={`/dashboard/dashboard_subsections/tab6/${event._id}`}
                    className="cursor-pointer bg-[#fec204] hover:bg-[#d3a203] px-4 py-2 rounded text-center text-sm transition"
                  >
                    Update
                  </Link>
                  <button
                    onClick={() => handleDeleteEvent(event._id)}
                    className="cursor-pointer bg-[#dc3641] hover:bg-[#cc232d] text-white px-4 py-2 rounded text-center text-sm transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h3 className="text-center py-4 text-gray-500">No events found...</h3>
        )}
      </div>
    </div>
  );
};

export default Page;
