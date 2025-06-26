"use client";

import { Mail, Phone, Instagram } from "lucide-react";
import { useState } from "react";
import { BounceLoader } from "react-spinners";
import { handleError, handleSuccess } from "@/app/utils";
import axios from "axios";
import { useRouter } from "next/navigation";
import { IoLogoTiktok } from "react-icons/io5";
import Link from "next/link";

const Footer = () => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

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

  return (
    <footer className="mt-32 p-8 bg-[#212d3c] text-white">
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
      <div className="container mx-auto pt-12">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 border-b border-gray-600 pb-2">
              Contact Info
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Mail size={18} className="text-gray-300" />
                <a
                  href="mailto:info@company.com"
                  className="hover:text-gray-300 transition-colors"
                >
                  info@photofy.co.uk
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={18} className="text-gray-300" />
                <a
                  href="tel:+1234567890"
                  className="hover:text-gray-300 transition-colors"
                >
                  07519584281
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 border-b border-gray-600 pb-2">
              Connect With Us
            </h3>
            <div className="flex flex-wrap gap-4 mb-4">
              <a
                onClick={() =>
                  router.push(
                    "https://www.instagram.com/photofyofficial?igsh=MnJncGw3cmN1NGpl"
                  )
                }
                target="_blank"
                className="bg-[#1a2533] p-2 rounded-full hover:bg-pink-600 transition-colors"
              >
                <Instagram size={24} />
              </a>
              <a
                onClick={() =>
                  router.push(
                    "https://www.tiktok.com/@photofyofficial?_t=ZN-8wZmg0tjOLO&_r=1"
                  )
                }
                target="_blank"
                className="bg-[#1a2533] p-2 rounded-full hover:bg-red-600 transition-colors"
              >
                <IoLogoTiktok size={24} />
              </a>
            </div>
            <p className="text-sm text-gray-300">
              Follow us for updates, news, and special offers!
            </p>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h3 className="text-xl font-bold mb-4 border-b border-gray-600 pb-2">
              Newsletter
            </h3>
            <p className="mb-4 text-gray-300">
              Subscribe to our newsletter to receive the latest updates and
              exclusive offers.
            </p>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="w-full px-4 py-2 bg-[#1a2533] rounded-md focus:outline-none focus:ring-2 focus:ring-[#dd492b] text-white"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#dd492b] cursor-pointer hover:bg-[#cb3c20] text-white font-medium py-2 px-4 rounded-md transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 border-b border-gray-600 pb-2">
              Important Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about#faqs"
                  className="hover:text-gray-300 transition-colors"
                >
                  FAQs
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300 transition-colors">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a
                  href="/policy"
                  className="hover:text-gray-300 transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-4 border-t border-gray-700 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} Photofy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
