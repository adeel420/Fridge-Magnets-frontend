"use client";
import { useEffect, useState } from "react";
import { CiImageOn } from "react-icons/ci";
import { BounceLoader } from "react-spinners";
import axios from "axios";
import { handleError, handleSuccess } from "@/app/utils";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

const Update1 = () => {
  const [files, setFiles] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const params = useParams();
  const id = params.update1;
  const router = useRouter();

  useEffect(() => {
    const handleSingle = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/events/${id}`
        );
        const data = response.data;
        setTitle(data.title);
        setDescription(data.description);
        setAddress(data.address);
        setDate(data.date);
        setImagePreview(data.image);
      } catch (err) {
        handleError(err);
      }
    };

    if (id) {
      handleSingle();
    }
  }, [id]);

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!title || !description || !date || !address) {
      handleError("Please fill all fields.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("date", date);
      formData.append("address", address);
      if (files) formData.append("image", files);

      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/events/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      handleSuccess("Event updated successfully!");
      setTitle("");
      setDescription("");
      setDate("");
      setAddress("");
      setFiles(null);
      setImagePreview("");
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      handleError("Failed to update event.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-20 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
      {/* Back Button */}
      <button
        className="absolute right-4 top-4 sm:right-6 bg-[#dc4929] px-3 py-2 text-white rounded-md hover:bg-[#b8391e] text-sm sm:text-base shadow transition"
        onClick={() => router.push("/dashboard")}
      >
        &larr; Back to dashboard
      </button>

      {/* Heading */}
      <h1 className="text-center text-2xl sm:text-3xl font-bold text-[#333] mb-10">
        Update Event
      </h1>

      {/* Loader */}
      {loading && (
        <div className="fixed top-0 left-0 h-full w-full bg-black/30 z-50 flex items-center justify-center">
          <BounceLoader color="#dd492b" />
        </div>
      )}

      {/* Form */}
      <form
        onSubmit={handleUpload}
        className="flex flex-col gap-8 w-full bg-white p-6 rounded-2xl shadow-md"
      >
        {/* Image Upload & Preview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <label className="border border-[#dd492b] text-[#dd492b] p-3 flex items-center justify-center gap-2 rounded cursor-pointer hover:bg-[#dd492b] hover:text-white transition text-base font-medium">
            <CiImageOn className="text-xl" />
            Upload Image
            <input
              type="file"
              hidden
              onChange={(e) => {
                setFiles(e.target.files[0]);
                setImagePreview(URL.createObjectURL(e.target.files[0]));
              }}
            />
          </label>

          {imagePreview && (
            <Image
              src={imagePreview}
              alt="Preview"
              width={200}
              height={100}
              className="object-cover rounded border mx-auto max-h-[160px] w-auto"
            />
          )}
        </div>

        {/* Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="text-sm sm:text-base font-semibold mb-1">
              Date:
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border p-2 rounded outline-none w-full"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm sm:text-base font-semibold mb-1">
              Title:
            </label>
            <input
              type="text"
              placeholder="Write title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border p-2 rounded outline-none w-full"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm sm:text-base font-semibold mb-1">
              Address:
            </label>
            <input
              type="text"
              placeholder="London, etc..."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="border p-2 rounded outline-none w-full"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm sm:text-base font-semibold mb-1">
              Description:
            </label>
            <textarea
              placeholder="Write description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border p-2 rounded outline-none w-full min-h-[100px]"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-[#dd492b] hover:bg-[#c53f26] text-white font-medium text-sm sm:text-base px-6 py-3 rounded transition w-full max-w-[300px] mx-auto"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default Update1;
