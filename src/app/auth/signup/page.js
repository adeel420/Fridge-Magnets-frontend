"use client";
import Link from "next/link";
import React, { useState } from "react";
import axios from "axios";
import { BounceLoader } from "react-spinners";

const Page = () => {
  const [showMsg, setShowMsg] = useState("");
  const [showErrorMsg, setShowErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;

    // Field validation
    if (!name || !email || !password) {
      return setShowErrorMsg("All fields are required");
    }
    if (name.length < 3) {
      return setShowErrorMsg("Length of name must be at least 3 characters");
    }
    if (password.length < 5) {
      return setShowErrorMsg("Password must be at least 5 characters long");
    }

    setLoading(true);

    try {
      // API request to register user
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/user/register`,
        signupInfo,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        setShowMsg(response.data.msg || "Signup successful!");
        setShowErrorMsg(""); // Clear error messages
        setSignupInfo({ name: "", email: "", password: "" }); // Clear form
      } else {
        setShowErrorMsg(response.data.msg || "Signup failed");
        setShowMsg(""); // Clear success messages
      }
    } catch (err) {
      console.error(err);
      const message =
        err.response?.data?.msg || "Registration failed. Try again.";
      setShowErrorMsg(message); // Show error message
      setShowMsg(""); // Clear success messages
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#f9fafc] min-h-screen flex items-center justify-center pt-42 pb-8 px-4">
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
      <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-[#333]">
          Create an account
        </h1>
        <p className="text-[#677077] text-center mt-2 text-sm">
          Sign up to access your{" "}
          <span className="font-semibold text-[#dd492b]">PHOTOFY</span> account
        </p>

        {/* Form */}
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-[#4c4340] mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              required
              onChange={handleChange}
              value={signupInfo.name}
              className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#dd492b] transition"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-[#4c4340] mb-1">
              Email address
            </label>
            <input
              type="email"
              name="email"
              autoComplete="email"
              required
              onChange={handleChange}
              value={signupInfo.email}
              placeholder="your@email.com"
              className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#dd492b] transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-[#4c4340] mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              onChange={handleChange}
              value={signupInfo.password}
              className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#dd492b] transition"
            />
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            className="w-full bg-[#dd492b] hover:bg-[#b93c1f] text-white py-2 rounded font-semibold transition cursor-pointer"
          >
            Sign Up
          </button>

          {/* Error Message */}
          {showErrorMsg && (
            <div className="bg-[#efcfd0] text-[brown] max-w-[400px] w-full p-2 text-lg mt-5 rounded border border-brown">
              {showErrorMsg}
            </div>
          )}

          {/* Success Message */}
          {showMsg && (
            <div className="bg-[#d1e6dd] text-[#003c40] max-w-[400px] w-full p-2 text-lg mt-3 rounded border border-[#003c40]">
              {showMsg}
            </div>
          )}

          {/* Sign In Link */}
          <p className="text-sm text-center text-gray-600">
            Already have an account?{" "}
            <Link
              href="/auth/signin"
              className="text-[#dd492b] hover:underline font-medium"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Page;
