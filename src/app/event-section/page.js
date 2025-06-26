"use client";

import Image from "next/image";
import {
  Camera,
  Gift,
  MessageSquare,
  CheckCircle,
  Calendar,
  MapPin,
  Mail,
  CreditCard,
} from "lucide-react";
import { useEffect, useState } from "react";
import { IoFunnelOutline } from "react-icons/io5";
import { eventImageMap } from "@/components/data/data";
import { useRouter } from "next/navigation";
import { handleError, handleSuccess } from "@/app/utils/index";
import axios from "axios";
import { BounceLoader } from "react-spinners";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import EventsForm from "@/components/EventsForm";
import Link from "next/link";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const Page = () => {
  const [events, setEvents] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [openAll, setOpenAll] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [eventType, setEventType] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/subscribe/`,
        { email: input }
      );
      handleSuccess("Subscribed successfully!");
      setInput("");
    } catch (err) {
      handleError("Subscription failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

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

  useEffect(() => {
    getEvents();
  }, []);

  const handleValidations = (e) => {
    e.preventDefault();
    if (
      !name ||
      !email ||
      !phone ||
      !eventDate ||
      !eventType ||
      !eventLocation ||
      !additionalInfo
    ) {
      return handleError("Please fill all form");
    }
    setOpenPopup(true);
  };

  return (
    <div className="pt-36 px-4 pb-20 max-w-7xl mx-auto">
      {loading && (
        <div
          className="fixed top-[0] left-[0] h-[100%] w-[100%] bg-[#00000041]"
          style={{ zIndex: 1111111111 }}
        >
          <div
            className="absolute top-[50%] left-[50%] "
            style={{ transform: "translate(-50%, -50%)" }}
          >
            <BounceLoader color="#dd492b" />
          </div>
        </div>
      )}
      {/* Hero Section */}
      <div className="relative rounded-2xl overflow-hidden mb-20 h-[500px]">
        <Image
          src="https://res.cloudinary.com/dyyuwwbaq/image/upload/v1750951123/img-18_w3qc7n.jpg"
          alt="main"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#e84118]/80 to-[#e84118]/40 z-10"></div>
        <div className="absolute inset-0 z-20 flex items-center">
          <div className="container mx-auto px-6 md:px-12">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Photofy at Your Event
              </h1>
              <div className="w-24 h-1 bg-white mb-6"></div>
              <p className="text-xl md:text-2xl text-white font-medium mb-8">
                Make Memories That Stick — Instantly!
              </p>
              <p className="text-white text-lg mb-8">
                Looking for a unique and memorable way to entertain your guests?
                Book Photofy for your next event! We capture moments throughout
                the night and transform them into personalised magnets your
                guests can take home the very same evening.
              </p>
              <button
                className="bg-white hover:bg-gray-100 text-[#e84118] font-medium py-3 px-8 rounded-lg transition-colors"
                onClick={() => router.push("#event")}
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* What We Offer Section */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What We Offer</h2>
          <div className="w-24 h-1 bg-[#e84118] mx-auto mb-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 bg-[#fff3f0] rounded-full flex items-center justify-center mb-4">
              <Camera className="text-[#e84118]" size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3">Live Photography</h3>
            <p className="text-gray-700">
              Our team captures candid and posed shots of your guests during the
              event.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 bg-[#fff3f0] rounded-full flex items-center justify-center mb-4">
              <Gift className="text-[#e84118]" size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3">Instant Magnet Printing</h3>
            <p className="text-gray-700">
              We print high-quality photo magnets on-site, ready for guests to
              collect before they leave.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 bg-[#fff3f0] rounded-full flex items-center justify-center mb-4">
              <MessageSquare className="text-[#e84118]" size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3">
              Personalised Event Message
            </h3>
            <p className="text-gray-700">
              Each magnet includes your custom event message or branding at the
              bottom — perfect for weddings, birthdays, corporate events, and
              more.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 bg-[#fff3f0] rounded-full flex items-center justify-center mb-4">
              <IoFunnelOutline className="text-[#e84118]" size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3">Fun Props</h3>
            <p className="text-gray-700">
              Add a little extra flair to the photos with our collection of
              playful props!
            </p>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-gray-50 rounded-2xl p-8 md:p-12 mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <div className="w-24 h-1 bg-[#e84118] mx-auto mb-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="relative">
            <div className="bg-white rounded-xl shadow-md p-6 relative z-10">
              <div className="absolute -top-4 -left-4 w-10 h-10 bg-[#e84118] rounded-full text-white flex items-center justify-center font-bold text-lg">
                1
              </div>
              <h3 className="text-xl font-bold mb-3 pt-2">We Set Up On Site</h3>
              <p className="text-gray-700">
                Discreet and stylish photo setup with props.
              </p>
            </div>
            <div className="absolute top-1/2 left-full w-16 h-1 bg-[#ffd1c6] hidden lg:block"></div>
          </div>

          <div className="relative">
            <div className="bg-white rounded-xl shadow-md p-6 relative z-10">
              <div className="absolute -top-4 -left-4 w-10 h-10 bg-[#e84118] rounded-full text-white flex items-center justify-center font-bold text-lg">
                2
              </div>
              <h3 className="text-xl font-bold mb-3 pt-2">We Snap</h3>
              <p className="text-gray-700">
                Our team captures your guests enjoying the event.
              </p>
            </div>
            <div className="absolute top-1/2 left-full w-16 h-1 bg-[#ffd1c6] hidden lg:block"></div>
          </div>

          <div className="relative">
            <div className="bg-white rounded-xl shadow-md p-6 relative z-10">
              <div className="absolute -top-4 -left-4 w-10 h-10 bg-[#e84118] rounded-full text-white flex items-center justify-center font-bold text-lg">
                3
              </div>
              <h3 className="text-xl font-bold mb-3 pt-2">We Print</h3>
              <p className="text-gray-700">
                Magnets are created on the spot with your personalised message.
              </p>
            </div>
            <div className="absolute top-1/2 left-full w-16 h-1 bg-[#ffd1c6] hidden lg:block"></div>
          </div>

          <div className="relative">
            <div className="bg-white rounded-xl shadow-md p-6 relative z-10">
              <div className="absolute -top-4 -left-4 w-10 h-10 bg-[#e84118] rounded-full text-white flex items-center justify-center font-bold text-lg">
                4
              </div>
              <h3 className="text-xl font-bold mb-3 pt-2">They Collect</h3>
              <p className="text-gray-700">
                Guests pick up their photo magnets before they head home!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Perfect For Section */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Perfect For</h2>
          <div className="w-24 h-1 bg-[#e84118] mx-auto mb-6"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
          {[
            "Weddings",
            "Birthday Parties",
            "Corporate Events",
            "Engagements",
            "Baby Showers",
            "School Functions",
            "Brand Activations",
          ].map((event, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm p-4 text-center hover:shadow-md transition-shadow hover:bg-[#fff3f0]"
            >
              <Image
                src={eventImageMap[event]}
                alt={event}
                width={60}
                height={60}
                priority
                className="mx-auto mb-3"
              />
              <p className="font-medium text-gray-800">{event}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Packages Section */}
      <div className="bg-[#fff3f0] rounded-2xl p-8 md:p-12 mb-20" id="event">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold mb-4">Events Package</h2>
            <div className="w-24 h-1 bg-[#e84118] mb-6"></div>

            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <h3 className="text-xl font-bold mb-3">
                Standard Package – £350
              </h3>
              <p className="text-gray-700 mb-4">Includes:</p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <CheckCircle
                    className="text-green-500 mr-2 mt-1 flex-shrink-0"
                    size={18}
                  />
                  <span>3 hours of service</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle
                    className="text-green-500 mr-2 mt-1 flex-shrink-0"
                    size={18}
                  />
                  <span>100 photo magnets</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle
                    className="text-green-500 mr-2 mt-1 flex-shrink-0"
                    size={18}
                  />
                  <span>Props and backdrop</span>
                </li>
              </ul>

              <h4 className="font-bold text-lg mb-2">Add-Ons:</h4>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <CheckCircle
                    className="text-[#e84118] mr-2 mt-1 flex-shrink-0"
                    size={18}
                  />
                  <div>
                    <span className="font-medium">Extra hour – £75</span>
                    <p className="text-sm text-gray-600">
                      Includes 50 additional magnets
                    </p>
                  </div>
                </li>
              </ul>

              <h4 className="font-bold text-lg mb-2">
                Travel & Location Surcharges:
              </h4>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <MapPin
                    className="text-red-500 mr-2 mt-1 flex-shrink-0"
                    size={18}
                  />
                  <span>
                    A travel/parking surcharge may apply depending on your event
                    location.
                  </span>
                </li>
                <li className="flex items-start">
                  <MapPin
                    className="text-red-500 mr-2 mt-1 flex-shrink-0"
                    size={18}
                  />
                  <span>
                    All Central London bookings incur a £100 surcharge to cover
                    additional travel time and vehicle-related expenses.
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="flex items-center text-yellow-800">
                <CreditCard className="text-yellow-600 mr-2" size={18} />
                <span className="font-medium">
                  Please note: Full payment is required to confirm your booking.
                </span>
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <div className="bg-white rounded-xl shadow-md p-8">
              <h3 className="text-2xl font-bold mb-6">
                Let&rsquo;s make your event unforgettable
              </h3>
              <p className="text-gray-700 mb-8">
                Ready to book Photofy for your event? Fill out the form below
                and we&rsquo;ll get back to you within 24 hours.
              </p>

              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e84118] focus:border-[#e84118]"
                      placeholder="John Doe"
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e84118] focus:border-[#e84118]"
                      placeholder="john@example.com"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="event-type"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Event Type
                  </label>
                  <select
                    id="event-type"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e84118] focus:border-[#e84118]"
                    onChange={(e) => setEventType(e.target.value)}
                  >
                    <option value="">Select event type</option>
                    <option value="wedding">Wedding</option>
                    <option value="birthday">Birthday Party</option>
                    <option value="corporate">Corporate Event</option>
                    <option value="engagement">Engagement</option>
                    <option value="baby-shower">Baby Shower</option>
                    <option value="school">School Function</option>
                    <option value="brand">Brand Activation</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Phone No.
                  </label>
                  <input
                    type="number"
                    id="phone"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e84118] focus:border-[#e84118]"
                    placeholder="(075)-12345678"
                    onChange={(e) => setPhone(e.target.value)}
                    value={phone}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="date"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Event Date
                    </label>
                    <input
                      type="date"
                      id="date"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e84118] focus:border-[#e84118]"
                      onChange={(e) => setEventDate(e.target.value)}
                      value={eventDate}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="location"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Event Location
                    </label>
                    <input
                      type="text"
                      id="location"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e84118] focus:border-[#e84118]"
                      placeholder="London"
                      onChange={(e) => setEventLocation(e.target.value)}
                      value={eventLocation}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Additional Information
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e84118] focus:border-[#e84118]"
                    placeholder="Tell us more about your event..."
                    onChange={(e) => setAdditionalInfo(e.target.value)}
                    value={additionalInfo}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#e84118] hover:bg-[#c0370f] text-white font-medium py-3 px-6 rounded-lg transition-colors"
                  onClick={handleValidations}
                >
                  Book Photofy for Your Event
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Events Section */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Catch Us Live!</h2>
          <div className="w-24 h-1 bg-[#e84118] mx-auto mt-4"></div>
          <p className="text-lg text-gray-700 mt-6">
            See where we&rsquo;ll be popping up next with live magnet printing.
          </p>
        </div>

        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events && events.length > 0 ? (
              events.slice(0, 3).map((event) => (
                <div
                  key={event._id}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="w-full h-48 bg-[#f9fafc] flex items-center justify-center">
                    <Image
                      src={event?.image}
                      alt={event.title}
                      height={300}
                      width={300}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="p-4 md:p-6">
                    <h3 className="text-lg md:text-xl font-bold mb-2">
                      {event.title}
                    </h3>
                    <div className="flex items-center text-gray-600 mb-1">
                      <Calendar size={16} className="mr-2" />
                      <span className="text-sm">{event.date}</span>
                    </div>
                    <div className="flex items-center text-gray-600 mb-3">
                      <MapPin size={16} className="mr-2" />
                      <span className="text-sm">{event.address}</span>
                    </div>
                    <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                      {event.description}
                    </p>
                    <Link
                      href={`/event-section/${event._id}`}
                      className="text-[#e84118] hover:text-[#c0370f] text-sm font-medium transition-colors"
                    >
                      Learn more →
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <h3 className="col-span-full text-center text-gray-600 text-lg">
                No event here...
              </h3>
            )}
          </div>

          {/* Expanded Events */}
          {openAll && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {events.slice(3).map((event) => (
                <div
                  key={event._id}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="w-full h-48 bg-[#f9fafc] flex items-center justify-center">
                    <Image
                      src={event?.image}
                      alt={event.title}
                      height={300}
                      width={300}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="p-4 md:p-6">
                    <h3 className="text-lg md:text-xl font-bold mb-2">
                      {event.title}
                    </h3>
                    <div className="flex items-center text-gray-600 mb-1">
                      <Calendar size={16} className="mr-2" />
                      <span className="text-sm">{event.date}</span>
                    </div>
                    <div className="flex items-center text-gray-600 mb-3">
                      <MapPin size={16} className="mr-2" />
                      <span className="text-sm">{event.address}</span>
                    </div>
                    <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                      {event.description}
                    </p>
                    <Link
                      href={`/event-section/${event._id}`}
                      className="text-[#e84118] hover:text-[#c0370f] text-sm font-medium transition-colors"
                    >
                      Learn more →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {events.length > 3 && (
          <div className="text-center mt-8">
            <button
              className="bg-[#e84118] hover:bg-[#c0370f] text-white font-medium py-3 px-8 rounded-lg transition-colors cursor-pointer"
              onClick={() => setOpenAll(true)}
            >
              View All Upcoming Events
            </button>
          </div>
        )}
      </div>

      {/* Newsletter Section */}
      <div className="inset-0 bg-gradient-to-r from-[#e84118]/80 to-[#e84118]/40 rounded-2xl p-8 md:p-12 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Stay Updated</h2>
        <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
          Want to be first to know when we&rsquo;re at an event near you or when
          we launch new packages? Join our mailing list!
        </p>

        <form
          className="max-w-md w-full mx-auto flex flex-col sm:flex-row gap-4 sm:gap-0"
          onSubmit={handleSubmit}
        >
          <input
            type="email"
            placeholder="Your email address"
            required
            className="flex-grow px-4 py-3 text-white rounded-lg sm:rounded-l-lg sm:rounded-r-none border border-[#e84118] outline-none focus:ring-2 focus:ring-[#e84118] bg-transparent"
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
          <button
            type="submit"
            className="bg-[#e84118] hover:bg-[#c0370f] text-white font-medium py-3 px-6 rounded-lg sm:rounded-r-lg sm:rounded-l-none transition-colors flex items-center justify-center"
          >
            <Mail className="mr-2" size={18} />
            Subscribe
          </button>
        </form>
      </div>

      {/* Payment Section */}
      <div
        className="fixed h-[100%] w-[100%] top-0 left-0 z-[111111111111122222222222222244444444444] bg-[#0000006a] "
        style={{ display: openPopup === true ? "block" : "none" }}
      >
        <div
          className="absolute top-[50%] left-[50%] bg-white w-[400px] p-4 "
          style={{ transform: "translate(-50%, -50%)" }}
        >
          <h2 className="text-2xl font-bold text-center">Payment</h2>
          <div className="w-18 h-1 bg-[#e84118] mx-auto mt-2"></div>
          <button
            className="absolute right-[20px] top-[20px] cursor-pointer font-bold bg-[#dd492b] text-white h-[30px] w-[30px] rounded hover:bg-[#b8371d] "
            onClick={() => setOpenPopup(false)}
          >
            &times;
          </button>

          <div className="m-auto">
            <div className="mt-8">
              <Elements stripe={stripePromise}>
                <EventsForm
                  name={name}
                  setName={setName}
                  email={email}
                  setEmail={setEmail}
                  phone={phone}
                  setPhone={setPhone}
                  eventType={eventType}
                  setEventType={setEventType}
                  eventDate={eventDate}
                  setEventDate={setEventDate}
                  eventLocation={eventLocation}
                  setEventLocation={setEventLocation}
                  additionalInfo={additionalInfo}
                  setAdditionalInfo={setAdditionalInfo}
                  amount={350}
                  setOpenPopup={setOpenPopup}
                />
              </Elements>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
