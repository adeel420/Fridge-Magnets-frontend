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
    <div className="shadow-2xl h-full p-4 flex flex-col rounded-3xl w-full overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <input
          type="text"
          className="border border-[#dd492b] p-2 rounded outline-0 w-full sm:w-[300px]"
          placeholder="Search emails..."
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
        />
        <h1 className="text-2xl font-bold text-center w-full sm:w-auto">
          News Letter Emails
        </h1>
      </div>

      {/* Scrollable Table */}
      <div className="overflow-auto self-center w-full max-h-[75vh] custom-scrollbar rounded-xl">
        <table className="min-w-full border-collapse table-auto ">
          <thead>
            <tr className="bg-[#dd492b] text-white">
              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">Email</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={3} className="p-4 text-center text-gray-500">
                  No email found...
                </td>
              </tr>
            ) : (
              filteredUsers.map((user, i) => (
                <tr
                  key={i}
                  className="border-b border-gray-300 hover:bg-[#f8d8d1] transition"
                >
                  <td className="p-3 break-words max-w-[200px] font-bold">
                    {i + 1}
                  </td>
                  <td className="p-3 break-words max-w-[250px]">
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
