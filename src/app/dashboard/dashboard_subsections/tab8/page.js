"use client";

import { handleError } from "@/app/utils";
import axios from "axios";
import { useEffect, useState } from "react";

const Page = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleGetUsers = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/subscribe/`
      );
      setUsers(response.data);
    } catch (err) {
      handleError(err);
    }
  };

  useEffect(() => {
    handleGetUsers();
  }, []);

  const filteredUsers = users.filter(
    (user) => user.email && user.email.includes(searchTerm)
  );

  return (
    <div className="shadow-2xl h-full p-4 sm:p-6 flex flex-col rounded-3xl w-full overflow-hidden bg-white">
      {/* Top Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <input
          type="text"
          className="border border-[#dd492b] px-4 py-2 rounded-md outline-none w-full sm:w-[300px] focus:ring-2 focus:ring-[#dd492b] transition"
          placeholder="Search emails..."
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
        />
        <h1 className="text-2xl sm:text-3xl font-bold text-center w-full sm:w-auto text-[#dd492b]">
          Newsletter Emails
        </h1>
      </div>

      {/* Scrollable Table */}
      <div className="overflow-auto w-full max-h-[75vh] custom-scrollbar rounded-xl">
        <table className="min-w-full text-sm border-collapse">
          <thead>
            <tr className="bg-[#dd492b] text-white text-left">
              <th className="p-3">#</th>
              <th className="p-3">Email</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={2} className="p-4 text-center text-gray-500">
                  No emails found...
                </td>
              </tr>
            ) : (
              filteredUsers.map((user, i) => (
                <tr
                  key={i}
                  className="border-b border-gray-200 hover:bg-orange-50 transition"
                >
                  <td className="p-3 font-semibold text-gray-700">{i + 1}</td>
                  <td className="p-3 break-words max-w-[300px] text-gray-800">
                    {user.email}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
