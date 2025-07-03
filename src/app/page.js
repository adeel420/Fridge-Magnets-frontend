"use client";
import Image from "next/image";
import { Mail, Maximize, Pencil, Star, Truck, Upload } from "lucide-react";
import { FaUser } from "react-icons/fa";
import { FiUpload } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { BounceLoader } from "react-spinners";

export default function Home() {
  const router = useRouter();
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

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
  return (
    <div className="pt-36 px-4">
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
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 mt-5 max-w-7xl mx-auto">
        {/* Text */}
        <div className="w-full md:w-1/2 flex flex-col gap-4 items-start justify-center text-center md:text-left">
          <h1 className="font-bold text-2xl sm:text-3xl lg:text-4xl text-[#dd492b] leading-tight">
            Turn Your Favorite Moments Into Personalised Magnets
          </h1>
          <p className="text-gray-800 text-base sm:text-lg">
            From heartfelt gifts to memorable keepsakes — create custom magnets
            in 4 unique sizes. Order online or have us live at your special
            events to create lasting memories
          </p>
          <button
            onClick={() => router.push("/shop")}
            className="bg-[#dc4929] hover:bg-[#b8391e] p-2 text-white cursor-pointer rounded w-[180px] "
          >
            Shop Now
          </button>
        </div>

        {/* Image */}
        <div className="w-full md:w-1/2">
          <Image
            src="https://res.cloudinary.com/dyyuwwbaq/image/upload/v1750951102/img-9_b5z8ym.jpg"
            alt="Creative Offer"
            width={800}
            height={450}
            className="w-full h-auto max-h-[450px] object-cover rounded-xl"
            priority
          />
        </div>
      </div>

      {/* Our Story */}
      <section className="mt-32 max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          Our Story
        </h1>
        <div className="w-24 h-1 bg-[#E84C24] mx-auto mt-4"></div>
        <p className="text-gray-800 text-base mt-6 sm:text-lg">
          At Photofy, we are a small business dedicated to creating personalised
          fridge magnets that capture your cherished moments. Our unique
          approach combines creativity with memorable experiences, making every
          occasion special.
        </p>
      </section>

      {/* How It Works Section */}
      <section className="mt-32 max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            How It Works
          </h2>
          <div className="w-24 h-1 bg-[#E84C24] mx-auto mt-4"></div>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Creating your personalized magnets is simple and fun
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {/* Step 1 */}
          <div className="flex flex-col items-center text-center p-6 rounded-xl border border-gray-200 transition-transform duration-300 hover:scale-105 hover:shadow-lg bg-white">
            <div className="w-16 h-16 rounded-full bg-[#fde2d4] flex items-center justify-center mb-4">
              <FiUpload className="h-8 w-8 text-[#E84C24]" />
            </div>
            <div className="bg-[#E84C24] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-lg mb-3">
              1
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Upload Your Photo
            </h3>
            <p className="text-gray-600 text-sm sm:text-base">
              Select your favorite photos from your device or social media
            </p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center text-center p-6 rounded-xl border border-gray-200 transition-transform duration-300 hover:scale-105 hover:shadow-lg bg-white">
            <div className="w-16 h-16 rounded-full bg-[#fde2d4] flex items-center justify-center mb-4">
              <Maximize className="h-8 w-8 text-[#E84C24]" />
            </div>
            <div className="bg-[#E84C24] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-lg mb-3">
              2
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Choose a Size
            </h3>
            <p className="text-gray-600 text-sm sm:text-base">
              Select from our 4 unique magnet sizes to fit your needs
            </p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center text-center p-6 rounded-xl border border-gray-200 transition-transform duration-300 hover:scale-105 hover:shadow-lg bg-white">
            <div className="w-16 h-16 rounded-full bg-[#fde2d4] flex items-center justify-center mb-4">
              <Pencil className="h-8 w-8 text-[#E84C24]" />
            </div>
            <div className="bg-[#E84C24] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-lg mb-3">
              3
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Add a Personal Touch
            </h3>
            <p className="text-gray-600 text-sm sm:text-base">
              Customise with text, filters, or special effects
            </p>
          </div>

          {/* Step 4 */}
          <div className="flex flex-col items-center text-center p-6 rounded-xl border border-gray-200 transition-transform duration-300 hover:scale-105 hover:shadow-lg bg-white">
            <div className="w-16 h-16 rounded-full bg-[#fde2d4] flex items-center justify-center mb-4">
              <Truck className="h-8 w-8 text-[#E84C24]" />
            </div>
            <div className="bg-[#E84C24] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-lg mb-3">
              4
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              We Print & Deliver
            </h3>
            <p className="text-gray-600 text-sm sm:text-base">
              Order online or have us live at your special event
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-50 py-16 px-4 mt-32">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              What Our Customers Say
            </h2>
            <div className="w-24 h-1 bg-[#E84C24] mx-auto mt-4"></div>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Discover why thousands of customers love turning their memories
              into magnets with PHOTOFY
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial Cards */}
            {[
              {
                text: "Absolutely love my magnets from Photofy! Such great quality and fast delivery.",
                name: "– Emily R",
              },
              {
                text: "Had Photofy at one of my mate’s weddings — got my photo printed and had a lasting memory. I even ordered more online the next day!",
                name: "– Jordan T",
              },
              {
                text: "I ordered magnets of my family vacation photos and they turned out beautifully! The colors are vibrant and the quality is excellent.",
                name: "– Ananya P",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col justify-between h-full"
              >
                <div>
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 fill-[#E84C24] text-[#E84C24]"
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 italic">
                    &ldquo;{testimonial.text}&rdquo;
                  </p>
                </div>
                <div className="flex items-center mt-auto">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-200 overflow-hidden relative">
                    <FaUser className="text-gray-600" />
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-800">
                      {testimonial.name}
                    </h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <div className="inset-0 bg-gradient-to-r from-[#e84118]/80 to-[#e84118]/40 rounded-2xl p-8 md:p-12 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Stay Updated</h2>
        <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
          Want to be first to know when we&rdquo;re at an event near you or when
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
    </div>
  );
}
