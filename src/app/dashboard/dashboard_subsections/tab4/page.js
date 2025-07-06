"use client";
import { useEffect, useState } from "react";
import { CiImageOn } from "react-icons/ci";
import { BounceLoader } from "react-spinners";
import axios from "axios";
import { handleError, handleSuccess } from "@/app/utils";
import Image from "next/image";

const Page = () => {
  const [imageInputs, setImageInputs] = useState([
    { file: null },
    { file: null },
    { file: null },
    { file: null },
    { file: null },
    { file: null },
  ]);
  const [imageData, setImageData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [size, setSize] = useState("");
  const [order, setOrder] = useState("");
  const [perfectFor, setPerfectFor] = useState("");
  const [loading, setLoading] = useState(false);
  const [sizes, setSizes] = useState([]);

  const handleDone = () => {
    const filtered = imageInputs.filter((img) => img.file);
    setImageData(
      filtered.map((img) => ({
        url: URL.createObjectURL(img.file),
        size: img.size,
        price: img.price,
      }))
    );
    setShowModal(false);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (
      !title ||
      !description ||
      !size ||
      !price ||
      imageInputs.every((img) => !img.file)
    ) {
      handleError("Please fill all fields and upload at least one image.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("orders", order || "0");
      formData.append("size", size);
      formData.append("price", price);

      const perfectForArray = perfectFor
        ? perfectFor
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean)
        : [];
      perfectForArray.forEach((item) => formData.append("perfectFor", item));

      imageInputs.forEach((img) => {
        if (img.file) {
          formData.append("images", img.file);
        }
      });

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/product`,
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
      setSize("");
      setPrice("");
      setOrder("");
      setPerfectFor("");
      setImageInputs(Array(6).fill({ file: null }));
      setImageData([]);
    } catch (err) {
      handleError("Failed to upload product.");
    } finally {
      setLoading(false);
    }
  };

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

  useEffect(() => {
    handleGet();
  }, []);

  return (
    <div className="shadow-2xl min-h-full p-6 sm:p-8 rounded-3xl bg-white">
      <h1 className="text-center text-2xl sm:text-3xl font-bold text-[#333] mb-6">
        Upload Products
      </h1>

      {/* Loading Spinner */}
      {loading && (
        <div className="fixed top-0 left-0 h-full w-full bg-[#00000041] z-[1111111111]">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <BounceLoader color="#dd492b" />
          </div>
        </div>
      )}

      <form
        onSubmit={handleUpload}
        className="flex flex-col items-center gap-6 pt-4 w-full"
      >
        {/* Image Upload Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl items-center">
          <button
            type="button"
            className="border-2 border-dashed border-[#dd492b] p-4 w-full text-center text-[#dd492b] hover:bg-[#dd492b] hover:text-white rounded-lg transition flex justify-center items-center gap-2"
            onClick={() => setShowModal(true)}
          >
            <CiImageOn className="text-2xl" /> Upload Product Images
          </button>

          {imageData.length > 0 && (
            <div className="grid grid-cols-3 gap-4">
              {imageData.map((item, index) => (
                <div key={index} className="flex flex-col items-center">
                  <Image
                    src={item.url}
                    alt={`uploaded-${index}`}
                    height={60}
                    width={60}
                    className="object-cover rounded shadow"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal for Image Selection */}
        {showModal && (
          <div className="fixed top-0 left-0 h-full w-full bg-[#0000006b] bg-opacity-40 z-50 flex justify-center items-center">
            <div className="bg-white rounded-xl p-6 shadow-xl max-w-[500px] w-full relative">
              <button
                className="absolute top-3 right-4 text-2xl text-gray-600 hover:text-black"
                onClick={() => setShowModal(false)}
              >
                &times;
              </button>
              <h2 className="text-lg font-semibold mb-4">
                Upload Product Images
              </h2>
              <div className="flex flex-wrap gap-4">
                {imageInputs.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center gap-2 w-fit"
                  >
                    <label className="text-3xl h-[60px] w-[60px] rounded-full flex items-center justify-center text-[#dd492b] border border-[#dd492b] border-dashed cursor-pointer hover:bg-[#dd492b] hover:text-white transition">
                      +
                      <input
                        type="file"
                        hidden
                        onChange={(e) => {
                          const updated = [...imageInputs];
                          updated[index].file = e.target.files[0];
                          setImageInputs(updated);
                        }}
                      />
                    </label>
                    {item.file && (
                      <Image
                        src={URL.createObjectURL(item.file)}
                        height={60}
                        width={60}
                        className="object-cover rounded shadow"
                        alt={`preview-${index}`}
                      />
                    )}
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={handleDone}
                className="bg-[#dd492b] hover:bg-[#b9371d] text-white px-6 py-2 rounded mt-4 ml-auto block transition"
              >
                Done
              </button>
            </div>
          </div>
        )}

        {/* Product Info Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Select Size:</label>
            <select
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-[#dd492b]"
            >
              <option value="">Select a size</option>
              {sizes.map((size) => (
                <option key={size._id} value={size._id}>
                  {size.size}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Title:</label>
            <input
              type="text"
              placeholder="Enter product title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-[#dd492b]"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Price:</label>
            <input
              type="number"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-[#dd492b]"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Description:</label>
            <textarea
              placeholder="Write product description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-[#dd492b] resize-none"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Minimum Order:</label>
            <input
              type="number"
              placeholder="e.g. 10"
              value={order}
              onChange={(e) => setOrder(e.target.value)}
              className="border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-[#dd492b]"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Perfect For:</label>
            <input
              type="text"
              placeholder="e.g. Gifts, Weddings, Birthdays"
              value={perfectFor}
              onChange={(e) => setPerfectFor(e.target.value)}
              className="border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-[#dd492b]"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-[#dd492b] hover:bg-[#b9371d] transition-all duration-200 text-white font-semibold py-3 px-6 rounded-xl w-full max-w-[300px] mt-6 shadow-md cursor-pointer"
        >
          Upload Product
        </button>
      </form>
    </div>
  );
};

export default Page;
