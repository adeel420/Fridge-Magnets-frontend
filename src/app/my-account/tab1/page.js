"use client";

import { handleError, handleSuccess } from "@/app/utils";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BounceLoader } from "react-spinners";

const Page = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null); // token initialized here

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      return handleError("Please first signup your account");
    }
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
      handleError(
        err.response?.data?.message || err.message || "Something went wrong"
      );
    }
  };

  return (
    <>
      {loading && (
        <div className="fixed inset-0 bg-black/40 z-[1111111111] flex items-center justify-center">
          <BounceLoader color="#dd492b" />
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col gap-6 bg-white shadow-2xl rounded-3xl"
      >
        <h2 className="text-center text-2xl sm:text-3xl font-bold text-[#dd492b]">
          Update Password
        </h2>

        {/* Name */}
        <div className="flex flex-col">
          <label className="text-sm sm:text-base font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            value={user?.name || ""}
            disabled
            className="border border-gray-300 bg-gray-100 text-gray-500 p-3 rounded-md outline-none cursor-not-allowed"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label className="text-sm sm:text-base font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            value={user?.email || ""}
            disabled
            className="border border-gray-300 bg-gray-100 text-gray-500 p-3 rounded-md outline-none cursor-not-allowed"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col">
          <label className="text-sm sm:text-base font-medium text-gray-700 mb-1">
            New Password
          </label>
          <input
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-[#dd492b] p-3 rounded-md outline-none focus:ring-2 focus:ring-[#dd492b]"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-[#dd492b] hover:bg-[#c63f22] transition-all text-white font-semibold py-3 rounded-md"
        >
          Reset Password
        </button>
      </form>
    </>
  );
};

export default Page;
