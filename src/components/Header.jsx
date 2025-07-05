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

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Shop", path: "/shop" },
  { label: "About", path: "/about" },
  { label: "Event", path: "/event-section" },
  { label: "Contact", path: "/contact" },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [token, setToken] = useState("");
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(false);
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
        }
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
    <header className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
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
      <div className="bg-[#dd492b] text-white flex justify-end">
        <div className="flex items-center border-r">
          <button
            className="flex items-center gap-2 p-3 cursor-pointer text-sm w-[120px] justify-center hover:bg-[white] hover:text-[#dd492b]"
            onClick={() => handleNavigate("/my-account")}
          >
            <FaUser /> My Account
          </button>
        </div>
        <div className="flex items-center border-r">
          <button
            className="flex items-center gap-2 cursor-pointer p-5 text-sm w-[120px] justify-center hover:bg-[white] hover:text-[#dd492b]"
            onClick={() => handleNavigate("/cart")}
          >
            <FaCartShopping /> My Cart
          </button>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl h-[100px] mx-auto flex items-center justify-between px-4 py-3">
        <button
          onClick={() => handleNavigate("/")}
          className="flex items-center"
        >
          <Image
            src="https://res.cloudinary.com/dyyuwwbaq/image/upload/v1750951125/logo_dzwpsi.png"
            alt="Logo"
            width={250}
            height={250}
            className="h-[250px] w-[250px]"
            priority
          />
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 font-medium text-gray-700">
          {navLinks.map((link) => (
            <button
              key={link.path}
              onClick={() => handleNavigate(link.path)}
              className="hover:text-[#ab331b] transition-colors cursor-pointer"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Auth */}
        <div className="hidden md:flex items-center gap-4 pr-11">
          {token ? (
            <Popover content={content} trigger="click">
              <div className="cursor-pointer text-white text-[22px] bg-[#dd492b] border border-white rounded-full p-2 h-[60px] w-[60px] flex items-center justify-center ">
                {user?.name?.charAt(0)}
              </div>
            </Popover>
          ) : (
            <>
              <button
                onClick={() => handleNavigate("/auth/signin")}
                className="text-[#dd492b] font-medium cursor-pointer"
              >
                Sign In
              </button>
              <button
                onClick={() => handleNavigate("/auth/signup")}
                className="bg-[#dd492b] text-white px-4 py-2 rounded hover:bg-[#ab331b] transition cursor-pointer"
              >
                Sign Up
              </button>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-2xl text-gray-700"
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
