"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BounceLoader } from "react-spinners";

const Page = () => {
  const [showMsg, setShowMsg] = useState("");
  const [showErrorMsg, setShowErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const copyLoginInfo = { ...loginInfo };
    copyLoginInfo[name] = value;
    setLoginInfo(copyLoginInfo);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;

    // Field validation
    if (!email || !password) {
      return setShowErrorMsg("All fields are required");
    }
    if (password.length < 5) {
      return setShowErrorMsg("Password must be at least 5 characters long");
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/user/login`,
        loginInfo,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        setShowMsg(response.data.msg || "Login successful!");
        localStorage.setItem("token", response.data.token);
        setShowErrorMsg("");
        setLoginInfo({ email: "", password: "" });
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      } else {
        setShowErrorMsg(response.data.msg || "Login failed");
        setShowMsg("");
      }
    } catch (err) {
      console.error(err);
      const message = err.response?.data?.msg || "Login failed. Try again.";
      setShowErrorMsg(message);
      setShowMsg("");
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
          Welcome back
        </h1>
        <p className="text-[#677077] text-center mt-2 text-sm">
          Sign in to access your{" "}
          <span className="font-semibold text-[#dd492b]">PHOTOFY</span> account
        </p>

        {/* Form */}
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
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
              value={loginInfo.email}
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
              value={loginInfo.password}
              className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#dd492b] transition"
            />
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full bg-[#dd492b] hover:bg-[#b93c1f] text-white py-2 rounded font-semibold transition"
          >
            Sign In
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

          {/* Forgot Password */}
          <div className="text-center">
            <Link
              href="/auth/forget-password"
              className="text-[#dd492b] text-sm hover:underline"
            >
              Forgot your password?
            </Link>
          </div>

          {/* Sign Up Link */}
          <p className="text-sm text-center text-gray-600">
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/signup"
              className="text-[#dd492b] hover:underline font-medium"
            >
              Sign up now
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Page;
