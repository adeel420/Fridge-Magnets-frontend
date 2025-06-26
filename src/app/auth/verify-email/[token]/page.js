"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import { handleSuccess } from "@/app/utils";
import { BounceLoader } from "react-spinners";

const Page = () => {
  const router = useRouter();
  const { token } = useParams();
  const [message, setMessage] = useState("Verifying...");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const verify = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/user/verify-email/${token}`
        );
        const successMsg = res.data.msg || "Email verified successfully";
        setMessage(successMsg);
        handleSuccess(successMsg);
        setTimeout(() => {
          router.push("/auth/signin");
        }, 1000);
      } catch (err) {
        setMessage(err.response?.data?.msg || "Verification failed");
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, [token, router]);

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
      <div
        className="fixed top-0 left-0 h-[100%] w-[100%] bg-[#212529] "
        style={{ zIndex: 111111111 }}
      >
        <div
          className="bg-white absolute top-[50%] left-[50%] rounded w-full max-w-[320px] p-3 sm:max-w-[400px] sm:p-6"
          style={{ transform: "translate(-50%, -50%)" }}
        >
          <h1 className="text-2xl text-center font-bold mb-4">
            Email Verification
          </h1>
          <p className="text-lg text-center">{message}</p>
          {message === "Email verified successfully" && (
            <p className="text-sm mt-2 text-gray-500">
              Redirecting to login...
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Page;
