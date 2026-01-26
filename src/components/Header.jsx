"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { GiHamburgerMenu } from "react-icons/gi";
import { GrClose } from "react-icons/gr";
import { FaUser } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { MdDashboard, MdLogout } from "react-icons/md";
import { handleError, handleSuccess } from "@/app/utils";
import { Popover } from "antd";
import axios from "axios";
import { BounceLoader } from "react-spinners";
// import { assets } from "./assets/assets";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Shop", path: "/shop" },
  { label: "Event", path: "/event-section" },
  { label: "About", path: "/about" },
  { label: "FAQ", path: "/faqs" },
  { label: "Contact", path: "/contact" },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [token, setToken] = useState("");
  const [user, setUser] = useState("");
  const [categories, setCategories] = useState([]);
  const [showShopDropdown, setShowShopDropdown] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      setToken(storedToken || "");
    }
  }, []);

  useEffect(() => {
    handleLogin();
  }, []);

  useEffect(() => {
    setLoading(false);
  }, [pathname]);

  const handleGetCategories = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/category/`,
      );
      setCategories(response.data || []);
    } catch (err) {
      console.error("Failed to fetch categories");
    }
  };

  useEffect(() => {
    handleGetCategories();
  }, []);

  const handleLogin = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/user/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setUser(response.data);
    } catch (err) {
      handleError("Login failed:", err.response?.data || err.message);
    }
  };

  const handleLogout = () => {
    handleSuccess("Logout Successfully");
    localStorage.removeItem("token");
    setToken("");
    router.push("/auth/signin");
  };

  const handleNavigate = (path) => {
    setLoading(true);
    router.push(path);
    // Reset loading after a short delay to prevent interference
    setTimeout(() => setLoading(false), 100);
  };

  const content = (
    <div className="w-[150px]">
      {user.role === 1 && (
        <button
          onClick={() => handleNavigate("/dashboard")}
          className="hover:bg-[#ccc] text-[black] w-full text-left p-2 flex gap-2 items-center text-[18px] font-semibold rounded cursor-pointer"
        >
          <MdDashboard /> Dashboard
        </button>
      )}
      <button
        onClick={handleLogout}
        className="hover:bg-[#ccc] w-full text-left p-2 flex gap-2 items-center text-[18px] font-semibold rounded cursor-pointer"
      >
        <MdLogout /> Logout
      </button>
    </div>
  );

  return (
    <header className="bg-white  fixed top-0 left-0 w-full z-50">
      {loading && (
        <div
          className="fixed top-0 left-0 h-full w-full bg-[#00000041]"
          style={{ zIndex: 1111111111 }}
        >
          <div
            className="absolute top-1/2 left-1/2"
            style={{ transform: "translate(-50%, -50%)" }}
          >
            <BounceLoader color="#dd492b" />
          </div>
        </div>
      )}

      {/* Top Strip */}
      <div className="text-[#dd492b] bg-white flex justify-end">
        <div className="flex items-center border-r">
          <button
            className="flex items-center gap-2 p-3 cursor-pointer text-sm w-[120px] justify-center hover:text-[white] hover:bg-[#dd492b]"
            onClick={() => handleNavigate("/my-account")}
          >
            <FaUser /> My Account
          </button>
        </div>
        <div className="flex items-center border-r">
          <button
            className="flex items-center gap-2 cursor-pointer p-5 text-sm w-[120px] justify-center hover:text-[white] hover:bg-[#dd492b]"
            onClick={() => handleNavigate("/cart")}
          >
            <FaCartShopping /> My Cart
          </button>
        </div>
      </div>

      {/* Main Header */}
      <div className=" h-[100px] mx-auto bg-[#dd492b]  flex items-center justify-between px-4 py-3">
        <button
          onClick={() => handleNavigate("/")}
          className="flex items-center"
        >
          <Image
            src={`https://res.cloudinary.com/dyyuwwbaq/image/upload/v1768758842/Screenshot_2026-01-18_225138-removebg-preview_1_jt80fp.png`}
            alt="Logo"
            width={250}
            height={50}
            className="h-[50px] w-[250px]"
            priority
          />
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 font-medium text-white">
          {navLinks.map((link) => {
            if (link.label === "Shop") {
              return (
                <div
                  key={link.path}
                  className="relative"
                  onMouseEnter={() => setShowShopDropdown(true)}
                  onMouseLeave={() => setShowShopDropdown(false)}
                >
                  <button
                    onClick={() => handleNavigate(link.path)}
                    className="hover:text-[#ab331b] transition-colors cursor-pointer"
                  >
                    {link.label}
                  </button>
                  {showShopDropdown && (
                    <div className="absolute top-full left-0 bg-white shadow-2xl rounded-xl py-3 min-w-[250px] z-50 border border-gray-100 transform transition-all duration-300 ease-out">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wide">
                          Shop Categories
                        </h3>
                      </div>
                      <button
                        onClick={() => {
                          setShowShopDropdown(false);
                          handleNavigate("/shop");
                        }}
                        className="flex items-center w-full text-left px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-[#dd492b] hover:to-[#b9371d] hover:text-white transition-all duration-200 group"
                      >
                        <div className="w-2 h-2 bg-[#dd492b] rounded-full mr-3 group-hover:bg-white"></div>
                        <span className="font-medium">All Products</span>
                      </button>
                      {categories.map((category, index) => (
                        <button
                          key={category._id}
                          onClick={() => {
                            setShowShopDropdown(false);
                            handleNavigate(`/shop?category=${category._id}`);
                          }}
                          className="flex items-center w-full text-left px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-[#dd492b] hover:to-[#b9371d] hover:text-white transition-all duration-200 group"
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          <div className="w-2 h-2 bg-gray-400 rounded-full mr-3 group-hover:bg-white transition-colors"></div>
                          <span className="font-medium">{category.name}</span>
                          <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            }
            return (
              <button
                key={link.path}
                onClick={() => handleNavigate(link.path)}
                className="hover:text-[#ab331b] transition-colors cursor-pointer"
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Auth */}
        <div className="hidden md:flex items-center gap-4 pr-11">
          {token ? (
            <Popover content={content} trigger="click">
              <div className="cursor-pointer text-[#dd492b] text-[22px] text-[#dd492b] bg-white border border-white rounded-full p-2 h-[60px] w-[60px] flex items-center justify-center ">
                {user?.name?.charAt(0)}
              </div>
            </Popover>
          ) : (
            <>
              <button
                onClick={() => handleNavigate("/auth/signin")}
                className="text-[white] font-medium cursor-pointer"
              >
                Sign In
              </button>
              <button
                onClick={() => handleNavigate("/auth/signup")}
                className="text-[#dd492b] bg-white px-4 py-2 rounded hover:bg-[transparent] hover:text-white hover:border-white hover:border transition cursor-pointer"
              >
                Sign Up
              </button>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-2xl text-white"
        >
          {menuOpen ? <GrClose /> : <GiHamburgerMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md px-4 py-4 space-y-4">
          {navLinks.map((link) => (
            <button
              key={link.path}
              onClick={() => {
                setMenuOpen(false);
                handleNavigate(link.path);
              }}
              className="block text-gray-700 hover:text-[#dd492b] transition cursor-pointer"
            >
              {link.label}
            </button>
          ))}
          {token ? (
            <Popover content={content} trigger="click">
              <div className="cursor-pointer text-white text-[22px] bg-[#dd492b] border border-white rounded-full p-2 h-[60px] w-[60px] flex items-center justify-center">
                {user?.name?.charAt(0)}
              </div>
            </Popover>
          ) : (
            <>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  handleNavigate("/auth/signin");
                }}
                className="block text-[#dd492b] font-medium cursor-pointer"
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  handleNavigate("/auth/signup");
                }}
                className="block bg-[#dd492b] text-white text-center py-2 px-4 rounded hover:bg-[#ab331b] transition cursor-pointer"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
