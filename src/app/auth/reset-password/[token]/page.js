"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import { BounceLoader } from "react-spinners";

const Page = () => {
  const [newPassword, setNewPassword] = useState("");
  const [showMsg, setShowMsg] = useState("");
  const [showErrorMsg, setShowErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { token } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/user/reset-password/${token}`,
        { newPassword }
      );
      setShowMsg(res.data.msg || "Password reset successfully");
      setTimeout(() => router.push("/auth/signin"), 1500);
    } catch (err) {
      setShowErrorMsg(err.response?.data?.msg || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f9fafc] px-4">
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
      <div className="bg-white p-6 rounded shadow max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-4">
          Set New Password
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
            className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#dd492b] transition"
            required
          />
          <button
            type="submit"
            className="bg-[#dd492b] text-white w-full py-2 rounded hover:bg-[#c83b1c]"
          >
            Reset Password
          </button>
        </form>
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
      </div>
    </div>
  );
};

export default Page;
