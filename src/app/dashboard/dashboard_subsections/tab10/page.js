"use client";
import { handleError, handleSuccess } from "@/app/utils";
import axios from "axios";
import { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { MdModeEdit, MdDelete } from "react-icons/md";

const Page = () => {
  const [input, setInput] = useState("");
  const [sizes, setSizes] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [editInput, setEditInput] = useState("");

  // CREATE SIZE
  const handleCreate = async (e) => {
    e.preventDefault();
    if (!input) return handleError("Please fill the input field");

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/category/`,
        { name: input },
      );
      handleSuccess("category created successfully");
      setInput("");
      handleGet();
    } catch (err) {
      handleError(err.response?.data?.message || "Failed to create category");
    }
  };

  // GET ALL SIZES
  const handleGet = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/category/`,
      );
      setSizes(response.data || []);
    } catch (err) {
      handleError(err.response?.data?.message || "Failed to fetch categories");
    }
  };

  // GET SIZE BY ID FOR EDITING
  const handleGetById = async (id) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/category/${id}`,
      );
      setEditInput(response.data.name || "");
    } catch (err) {
      handleError(err.response?.data?.message || "Failed to fetch category");
    }
  };

  // UPDATE SIZE
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editInput) return handleError("Please enter a size");
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/category/${selectedId}`,
        {
          name: editInput,
        },
      );
      handleSuccess("category updated successfully");
      setOpenPopup(false);
      handleGet();
    } catch (err) {
      handleError(err.response?.data?.message || "Failed to update category");
    }
  };

  // OPEN EDIT POPUP
  const openEditPopup = async (id) => {
    setSelectedId(id);
    setOpenPopup(true);
    await handleGetById(id);
  };

  useEffect(() => {
    handleGet();
  }, []);

  return (
    <div className="shadow-2xl min-h-full p-6 sm:p-8 rounded-3xl bg-white">
      <h1 className="text-center text-2xl sm:text-3xl font-bold text-[#333] mb-6">
        Create Categories
      </h1>

      {/* Create Form */}
      <form
        onSubmit={handleCreate}
        className="flex flex-col sm:flex-row gap-3 justify-center items-center"
      >
        <input
          type="text"
          placeholder="Enter category name..."
          className="border border-[#dd492b] focus:ring-2 focus:ring-[#dd492b] p-3 rounded-lg w-full sm:w-[300px] text-sm outline-none transition"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="bg-[#dd492b] hover:bg-[#b9371d] p-3 text-white rounded-lg transition"
        >
          <IoIosSearch className="text-xl" />
        </button>
      </form>

      {/* Size Table */}
      <div className="overflow-auto max-h-[65vh] custom-scrollbar rounded-xl mt-12 border border-gray-200">
        <table className="min-w-full border-collapse table-auto text-sm sm:text-base">
          <thead>
            <tr className="bg-[#dd492b] text-white">
              <th className="p-4 text-left">Size</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sizes.length > 0 ? (
              sizes.map((size) => (
                <tr
                  key={size._id}
                  className="border-b border-gray-200 hover:bg-[#fff2f0] transition"
                >
                  <td className="p-4 break-words max-w-[200px] font-medium text-gray-700">
                    {size.name}
                  </td>
                  <td className="p-4 flex items-center gap-2">
                    <button
                      className="bg-[#fec107] hover:bg-[#dfa800] text-white p-2 rounded transition"
                      onClick={() => openEditPopup(size._id)}
                    >
                      <MdModeEdit />
                    </button>
                    <button
                      className="bg-[#dc3546] hover:bg-[#c02030] text-white p-2 rounded transition"
                      onClick={async () => {
                        try {
                          await axios.delete(
                            `${process.env.NEXT_PUBLIC_API_URL}/category/${size._id}`,
                          );
                          handleSuccess("Category deleted");
                          handleGet();
                        } catch (err) {
                          handleError(
                            err.response?.data?.message ||
                              "Failed to delete category",
                          );
                        }
                      }}
                    >
                      <MdDelete />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="text-center py-6 text-gray-500">
                  No categories created...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Popup */}
      {openPopup && (
        <div className="fixed top-0 left-0 h-full w-full bg-[#0000006b] z-50 flex items-center justify-center">
          <div className="bg-white w-[90%] sm:w-[400px] rounded-2xl shadow-xl p-6 relative animate-fadeIn">
            <button
              className="absolute right-4 top-3 text-2xl text-gray-600 hover:text-black transition"
              onClick={() => setOpenPopup(false)}
            >
              &times;
            </button>
            <h3 className="text-center font-semibold text-lg text-[#333] mb-4">
              Update Category
            </h3>
            <form
              onSubmit={handleUpdate}
              className="flex flex-col sm:flex-row gap-3 justify-center items-center"
            >
              <input
                type="text"
                placeholder="Update category..."
                className="border border-[#dd492b] focus:ring-2 focus:ring-[#dd492b] p-3 rounded-lg w-full sm:w-[260px] text-sm outline-none transition"
                value={editInput}
                onChange={(e) => setEditInput(e.target.value)}
              />
              <button
                type="submit"
                className="bg-[#dd492b] hover:bg-[#b9371d] p-3 text-white rounded-lg transition"
              >
                <IoIosSearch className="text-xl" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
