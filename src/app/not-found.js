// app/not-found.js

"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center px-4">
      <h1 className="text-6xl font-bold text-[#eb4d21] mb-4">404</h1>
      <p className="text-2xl font-semibold mb-2 text-[#19202C]">
        Page Not Found
      </p>
      <p className="text-gray-600 mb-6">
        The page you are looking for might have been removed or is temporarily
        unavailable.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-[#eb4d21] text-white rounded-md hover:bg-[#d03f17] transition"
      >
        Go to Homepage
      </Link>
    </div>
  );
}
