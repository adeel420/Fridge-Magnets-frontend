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
        `${process.env.NEXT_PUBLIC_API_URL}/size/`,
        { size: input }
      );
      handleSuccess("Size created successfully");
      setInput("");
      handleGet();
    } catch (err) {
      handleError(err);
    }
  };

  // GET ALL SIZES
  const handleGet = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/size/`
      );
      setSizes(response.data || []);
    } catch (err) {
      handleError(err);
    }
  };

  // GET SIZE BY ID FOR EDITING
  const handleGetById = async (id) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/size/${id}`
      );
      setEditInput(response.data.size || "");
    } catch (err) {
      handleError(err);
    }
  };

  // UPDATE SIZE
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editInput) return handleError("Please enter a size");
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/size/${selectedId}`, {
        size: editInput,
      });
      handleSuccess("Size updated successfully");
      setOpenPopup(false);
      handleGet();
    } catch (err) {
      handleError(err);
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
    <div className="shadow-2xl min-h-full p-4 rounded-3xl">
      <h1 className="text-center text-2xl font-bold mb-6">Create Sizes</h1>

      {/* Form */}
      <form className="flex gap-1 justify-center">
        <input
          type="text"
          placeholder="Create size..."
          className="border border-[#dd492b] p-2 rounded outline-0 w-full sm:w-[300px]"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="bg-[#dd492b] hover:bg-[#b9371d] pl-3 pr-3 p-1 text-white cursor-pointer rounded"
          onClick={handleCreate}
        >
          <IoIosSearch />
        </button>
      </form>

      {/* Table */}
      <div className="overflow-auto max-h-[75vh] custom-scrollbar rounded-xl mt-12">
        <table className="min-w-full border-collapse table-auto">
          <thead>
            <tr className="bg-[#dd492b] text-white">
              <th className="p-3 text-left">Size</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sizes.length > 0 ? (
              sizes.map((size) => (
                <tr
                  key={size._id}
                  className="border-b border-gray-300 hover:bg-[#f8d8d1] transition"
                >
                  <td className="p-3 break-words max-w-[200px]">{size.size}</td>
                  <td className="p-3 flex items-center gap-2">
                    <button
                      className="bg-[#fec107] hover:bg-[#dfa800] p-2 rounded cursor-pointer"
                      onClick={() => openEditPopup(size._id)}
                    >
                      <MdModeEdit />
                    </button>
                    <button
                      className="bg-[#dc3546] text-white hover:bg-[#c02030] p-2 rounded cursor-pointer"
                      onClick={async () => {
                        try {
                          await axios.delete(
                            `${process.env.NEXT_PUBLIC_API_URL}/size/${size._id}`
                          );
                          handleSuccess("Size deleted");
                          handleGet();
                        } catch (err) {
                          handleError(err);
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
                <td colSpan="2" className="text-center py-4 text-gray-500">
                  No sizes created...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Popup */}
      {openPopup && (
        <div className="fixed top-0 left-0 h-full w-full bg-[#0000006b] z-50">
          <div
            className="bg-white p-6 w-[400px] absolute top-[50%] left-[50%] rounded shadow-xl"
            style={{ transform: "translate(-50%, -50%)" }}
          >
            <button
              className="absolute right-4 top-2 text-2xl"
              onClick={() => setOpenPopup(false)}
            >
              &times;
            </button>
            <h3 className="text-center font-semibold text-lg">Update Size</h3>
            <form className="flex gap-1 justify-center mt-6">
              <input
                type="text"
                placeholder="Update size..."
                className="border border-[#dd492b] p-2 rounded outline-0 w-full sm:w-[300px]"
                value={editInput}
                onChange={(e) => setEditInput(e.target.value)}
              />
              <button
                className="bg-[#dd492b] hover:bg-[#b9371d] pl-3 pr-3 p-1 text-white rounded"
                onClick={handleUpdate}
              >
                <IoIosSearch />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
