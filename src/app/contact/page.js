"use client";

import { useState } from "react";
import { Mail, Phone, Clock, Instagram, Send, CheckCircle } from "lucide-react";
import { handleError } from "@/app/utils";
import { BounceLoader } from "react-spinners";
import { IoLogoTiktok } from "react-icons/io5";
import { useRouter } from "next/navigation";

const Page = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/contact/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formState),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      const data = await response.json();

      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormState({ name: "", email: "", subject: "", message: "" });
      }, 3000);
    } catch (error) {
      handleError(
        "Sorry, there was an error sending your message. Please try again later."
      );
    } finally {
      setLoading(false);
    }
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
      {/* Header */}
      <div className="text-center mt-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          Contact Us
        </h1>
        <div className="w-20 h-1 bg-[#dd492b] mx-auto mb-6 mt-2 rounded"></div>
        <p className="text-lg text-gray-600 max-w-xl mx-auto">
          Have a question or want to book a session? Reach out to us and we’ll
          respond promptly.
        </p>
      </div>

      {/* Main Section */}
      <div className="mt-20 grid lg:grid-cols-2 gap-10">
        {/* Contact Info */}
        <div className="space-y-10">
          <div className="bg-gray-50 p-8 rounded-xl shadow-md hover:shadow-xl transition duration-300">
            <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>

            <div className="space-y-6">
              <InfoRow
                icon={Mail}
                label="Email"
                value="info@photofy.co.uk"
                href="mailto:info@photofy.co.uk"
              />
              <InfoRow
                icon={Phone}
                label="Phone"
                value="07519584281"
                href="tel:07519584281"
              />
              <div className="flex items-start">
                <Clock className="text-[#dd492b] mt-1 mr-4" size={22} />
                <div>
                  <h3 className="font-medium text-gray-900">Business Hours</h3>
                  <p className="text-gray-700">Mon - Fri: 9am - 6pm</p>
                  <p className="text-gray-700">Sat: 9am - 8pm</p>
                  <p className="text-gray-700">Sun: 11am - 5pm</p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition duration-300">
            <h2 className="text-2xl font-semibold mb-6">Follow Us</h2>
            <p className="text-gray-700 mb-6">
              Stay connected and explore our latest updates, behind-the-scenes,
              and more.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                {
                  name: "Instagram",
                  icon: Instagram,
                  link: "https://www.instagram.com/photofyofficial?igsh=MnJncGw3cmN1NGpl",
                },
                {
                  name: "TikTok",
                  icon: IoLogoTiktok,
                  link: "https://www.tiktok.com/@photofyofficial?_t=ZN-8wZmg0tjOLO&_r=1",
                },
              ].map(({ name, icon: Icon, link }, idx) => (
                <a
                  key={idx}
                  href={link}
                  className="flex flex-col items-center bg-gray-100 p-4 rounded-lg hover:shadow-lg hover:scale-105 transition-transform duration-300"
                >
                  <div className="w-12 h-12 bg-[#fee1d3] rounded-full flex items-center justify-center mb-2">
                    <Icon className="text-[#dd492b]" size={24} />
                  </div>
                  <span className="text-sm font-medium">{name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-xl shadow-lg p-8 w-full">
          <h2 className="text-2xl font-bold mb-2 text-center">
            Send Us a Message
          </h2>
          <div className="w-20 h-1 bg-[#dd492b] mx-auto mb-6 rounded"></div>

          {isSubmitted ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 flex items-center space-x-3">
              <CheckCircle className="text-green-500" size={24} />
              <div>
                <h3 className="font-semibold text-green-800">Message Sent!</h3>
                <p className="text-green-700">
                  Thanks! We&rsquo;ll get back to you soon.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {[
                {
                  id: "name",
                  label: "Your Name",
                  type: "text",
                  placeholder: "John Doe",
                },
                {
                  id: "email",
                  label: "Email Address",
                  type: "email",
                  placeholder: "john@example.com",
                },
                {
                  id: "subject",
                  label: "Subject",
                  type: "text",
                  placeholder: "Booking Inquiry",
                },
              ].map(({ id, label, type, placeholder }) => (
                <div key={id}>
                  <label
                    htmlFor={id}
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {label}
                  </label>
                  <input
                    type={type}
                    id={id}
                    name={id}
                    value={formState[id]}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#dd492b] focus:border-[#dd492b] outline-none transition-all"
                    placeholder={placeholder}
                  />
                </div>
              ))}

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  rows={5}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#dd492b] focus:border-[#dd492b] outline-none transition-all"
                  placeholder="Tell us about your project or inquiry..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#dd492b] hover:bg-[#c23a1e] text-white font-semibold py-3 px-6 rounded-lg transition duration-300 flex items-center justify-center cursor-pointer"
              >
                <Send size={18} className="mr-2" />
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

// Reusable Info Row Component
const InfoRow = ({ icon: Icon, label, value, href }) => (
  <div className="flex items-start">
    <Icon className="text-[#dd492b] mt-1 mr-4" size={22} />
    <div>
      <h3 className="font-medium text-gray-900">{label}</h3>
      {href ? (
        <a href={href} className="text-[#dd492b] hover:underline break-all">
          {value}
        </a>
      ) : (
        <p className="text-gray-700">{value}</p>
      )}
    </div>
  </div>
);

export default Page;
