"use client";
import { useState } from "react";
import { CiImageOn } from "react-icons/ci";
import { BounceLoader } from "react-spinners";
import axios from "axios";
import { handleError, handleSuccess } from "@/app/utils";
import Image from "next/image";

const Page = () => {
  const [files, setFiles] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [address, setAddress] = useState("");

  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!title || !description || !date || !address || !files) {
      handleError("Please fill all fields and upload at least one image.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("date", date);
      formData.append("address", address);
      formData.append("image", files);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/events`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      handleSuccess("Events uploaded successfully!");

      // Reset form
      setTitle("");
      setDescription("");
      setDate("");
      setAddress("");
      setFiles;
    } catch (err) {
      console.error(err);
      handleError("Failed to upload product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="shadow-2xl min-h-full p-6 sm:p-8 rounded-3xl bg-white">
      <h1 className="text-center text-2xl sm:text-3xl font-bold text-[#333] mb-6">
        Upload Events
      </h1>

      {/* Loading Spinner Overlay */}
      {loading && (
        <div className="fixed top-0 left-0 h-full w-full bg-[#00000041] z-[1111111111]">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <BounceLoader color="#dd492b" />
          </div>
        </div>
      )}

      {/* Form */}
      <form
        onSubmit={handleUpload}
        className="flex flex-col items-center gap-6 pt-4 w-full"
      >
        {/* Image Upload + Preview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl items-center">
          <label className="border-2 border-dashed border-[#dd492b] p-4 text-center text-[#dd492b] hover:bg-[#dd492b] hover:text-white transition-all cursor-pointer rounded-lg flex flex-col items-center justify-center gap-2">
            <CiImageOn className="text-3xl" />
            Upload Event Image
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFiles(e.target.files[0])}
              hidden
            />
          </label>

          {files && (
            <div className="flex justify-center">
              <Image
                src={URL.createObjectURL(files)}
                alt="Uploaded"
                height={60}
                width={180}
                className="rounded-xl object-cover border shadow"
              />
            </div>
          )}
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-1">
              Event Date
            </label>
            <input
              type="date"
              onChange={(e) => setDate(e.target.value)}
              value={date}
              className="border border-gray-300 p-3 rounded-md outline-none focus:ring-2 focus:ring-[#dd492b] transition"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-1">
              Event Title
            </label>
            <input
              type="text"
              placeholder="Enter title..."
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              className="border border-gray-300 p-3 rounded-md outline-none focus:ring-2 focus:ring-[#dd492b] transition"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-1">
              Event Address
            </label>
            <input
              type="text"
              placeholder="e.g., London, UK"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="border border-gray-300 p-3 rounded-md outline-none focus:ring-2 focus:ring-[#dd492b] transition"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-1">
              Event Description
            </label>
            <textarea
              placeholder="Describe your event..."
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              rows={4}
              className="border border-gray-300 p-3 rounded-md outline-none focus:ring-2 focus:ring-[#dd492b] transition resize-none"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-[#dd492b] hover:bg-[#bb3f23] transition-all duration-200 text-white font-semibold py-3 px-6 rounded-xl w-full max-w-[300px] mt-4 shadow-md"
        >
          Upload Event
        </button>
      </form>
    </div>
  );
};

export default Page;
