"use client";

import { handleError, handleSuccess } from "@/app/utils";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BounceLoader } from "react-spinners";

const Page = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password) {
      return handleError("New password is written");
    }
    if (password.length < 5) {
      return handleError("Length of password must be 5 characters long");
    }
    setLoading(true);
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/user/update-password/${user.email}`,
        { password }
      );
      setLoading(false);
      handleSuccess("Password updated successful");
      setPassword("");
    } catch (err) {
      handleError(err);
    }
  };

  useEffect(() => {
    const handleGet = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/user`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUser(response.data);
      } catch (err) {
        // handleError(
        //   err.response?.data?.message || err.message || "Something went wrong"
        // );
      }
    };

    handleGet();
  }, [token]);

  return (
    <div className="shadow-2xl h-full p-6 sm:p-8 rounded-3xl w-full max-w-3xl mx-auto bg-white">
      <h1 className="text-center text-2xl sm:text-3xl font-bold text-[#dd492b] mb-8">
        Update Password
      </h1>

      {loading && (
        <div className="fixed top-0 left-0 h-full w-full bg-black/30 z-50 flex items-center justify-center">
          <BounceLoader color="#dd492b" />
        </div>
      )}

      <form className="w-full flex flex-col gap-5" onSubmit={handleSubmit}>
        {/* Name */}
        <div className="flex flex-col">
          <label className="text-base sm:text-lg font-semibold mb-1">
            Name:
          </label>
          <input
            type="text"
            placeholder="Enter your name"
            value={user?.name || ""}
            disabled
            className="border p-3 rounded bg-gray-100 text-gray-500 cursor-not-allowed"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label className="text-base sm:text-lg font-semibold mb-1">
            Email:
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            value={user?.email || ""}
            disabled
            className="border p-3 rounded bg-gray-100 text-gray-500 cursor-not-allowed"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col">
          <label className="text-base sm:text-lg font-semibold mb-1">
            New Password:
          </label>
          <input
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-3 rounded outline-none focus:ring-2 focus:ring-[#dd492b] transition"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-[#dd492b] hover:bg-[#bd381d] text-white py-3 rounded text-base font-semibold mt-4 transition"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default Page;
