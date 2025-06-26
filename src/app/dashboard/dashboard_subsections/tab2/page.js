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

      handleSuccess("Product uploaded successfully!");

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
    <div className="shadow-2xl min-h-full p-4 rounded-3xl">
      <h1 className="text-center text-2xl font-bold mb-6">Upload Events</h1>
      {loading && (
        <div className="fixed top-0 left-0 h-full w-full bg-[#00000041] z-[1111111111]">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <BounceLoader color="#dd492b" />
          </div>
        </div>
      )}

      <form
        onSubmit={handleUpload}
        className="flex flex-col items-center gap-6 pt-8 w-full"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">
          <div>
            <label className="border p-2 hover:bg-[#dd492b] flex items-center gap-2 justify-center hover:text-white cursor-pointer rounded w-full text-center">
              <CiImageOn /> Upload Images
              <input
                type="file"
                onChange={(e) => setFiles(e.target.files[0])}
                hidden
              />
            </label>
          </div>

          {files && (
            <Image
              src={URL.createObjectURL(files)}
              alt="image-url"
              height={60}
              width={180}
              className=" self-center "
            />
          )}
        </div>

        <div className="grid grid-cols-1 items-center md:grid-cols-2 gap-6 w-full max-w-5xl">
          <div className="flex flex-col">
            <label className="text-xl font-semibold mb-1">Date:</label>
            <input
              type="date"
              onChange={(e) => setDate(e.target.value)}
              value={date}
              className="border p-2 outline-none rounded w-full"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-xl font-semibold mb-1">Title:</label>
            <input
              type="text"
              placeholder="Write title..."
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              className="border p-2 outline-none rounded w-full"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-xl font-semibold mb-1">Address:</label>
            <input
              type="text"
              placeholder="London, etc..."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="border p-2 outline-none rounded w-full"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-xl font-semibold mb-1">Description:</label>
            <textarea
              placeholder="Write description..."
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              className="border p-2 outline-none rounded w-full"
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-[#dd492b] cursor-pointer transition text-white p-2 rounded w-full max-w-[400px] mt-6"
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default Page;
