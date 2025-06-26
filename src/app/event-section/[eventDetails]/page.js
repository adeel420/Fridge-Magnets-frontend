"use client";

import axios from "axios";
import { Calendar, MapPin } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BounceLoader } from "react-spinners";

const EventDetails = () => {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(false);

  const params = useParams();
  const id = params?.eventDetails;

  useEffect(() => {
    if (!id) return;

    const handleGet = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/events/${id}`
        );
        setEvent(response.data);
      } catch (err) {
        console.error("Error fetching event:", err);
      } finally {
        setLoading(false);
      }
    };

    handleGet();
  }, [id]);

  return (
    <div className="pt-32 px-4 md:px-8 lg:px-16 pb-20 max-w-7xl mx-auto">
      {loading && (
        <div className="fixed top-0 left-0 w-full h-full bg-[#00000041] z-[9999] flex items-center justify-center">
          <BounceLoader color="#dd492b" />
        </div>
      )}

      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
        Event Details
      </h1>
      <div className="w-16 md:w-24 h-1 bg-white mb-6"></div>

      <div className="space-y-4">
        {event?.image && (
          <Image
            src={event.image}
            alt={event?.title}
            className="w-full h-auto max-h-[500px] object-cover rounded-lg"
          />
        )}

        <h2 className="text-2xl sm:text-3xl md:text-4xl text-center text-[#dd492b] font-semibold">
          {event?.title}
        </h2>

        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6 text-lg md:text-xl text-gray-400 mb-2">
          <div className="flex items-center mb-1 sm:mb-0">
            <Calendar size={20} className="mr-2 text-[#dd492b]" />
            <span>{event?.date}</span>
          </div>
          <div className="flex items-center">
            <MapPin size={20} className="mr-2 text-[#dd492b]" />
            <span>{event?.address}</span>
          </div>
        </div>

        <p className="text-base sm:text-lg md:text-xl mt-12 leading-relaxed">
          {event?.description}
        </p>
      </div>
    </div>
  );
};

export default EventDetails;
