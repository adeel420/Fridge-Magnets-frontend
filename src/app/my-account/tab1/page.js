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
        handleError(
          err.response?.data?.message || err.message || "Something went wrong"
        );
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
      <form
        className="w-full max-w-lg mx-auto flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        {/* Name */}
        <div className="flex flex-col">
          <label className="text-xl font-semibold mb-1">Name:</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={user?.name || ""}
            disabled
            className="border p-2 outline-none rounded bg-transparent text-[gray]"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label className="text-xl font-semibold mb-1">Email:</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={user?.email || ""}
            disabled
            className="border p-2 outline-none rounded bg-transparent text-[gray]"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col">
          <label className="text-xl font-semibold mb-1">Password:</label>
          <input
            type="password"
            placeholder="Enter new password"
            className="border p-2 outline-none rounded bg-transparent "
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-[#dd492b] hover:bg-[#bd381d] transition text-white p-2 rounded mt-4"
        >
          Reset Password
        </button>
      </form>
    </>
  );
};

export default Page;
