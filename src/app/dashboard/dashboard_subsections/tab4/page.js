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
    <div className="shadow-2xl min-h-full p-4 rounded-3xl">
      <h1 className="text-center text-2xl font-bold mb-6">Upload Products</h1>
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
            <label
              className="border p-2 hover:bg-[#dd492b] flex items-center gap-2 justify-center hover:text-white cursor-pointer rounded w-full text-center"
              onClick={() => setShowModal(true)}
            >
              <CiImageOn /> Upload Images
            </label>
          </div>

          {showModal && (
            <div className="fixed top-0 left-0 h-full w-full bg-[#00000041] z-50">
              <div className="absolute top-1/2 left-1/2 bg-white p-4 rounded shadow transform -translate-x-1/2 -translate-y-1/2">
                <div className="flex flex-col">
                  <button
                    onClick={() => setShowModal(false)}
                    className="self-end text-2xl cursor-pointer"
                  >
                    &times;
                  </button>

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
                          <div className="flex flex-col items-center gap-2">
                            <Image
                              src={URL.createObjectURL(item.file)}
                              height={60}
                              width={60}
                              className="object-cover rounded"
                              alt={`preview-${index}`}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={handleDone}
                    className="self-end bg-[red] text-white p-2 rounded cursor-pointer mt-3"
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          )}

          <div>
            {imageData.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 w-full max-w-5xl">
                {imageData.map((item, index) => (
                  <div key={index} className="flex flex-col items-center gap-2">
                    <Image
                      src={item.url}
                      alt={`uploaded-${index}`}
                      height={80}
                      width={80}
                      className="object-cover rounded"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 items-center md:grid-cols-2 gap-6 w-full max-w-5xl">
          <div className="flex flex-col">
            <label className="text-xl font-semibold mb-1">Select Size:</label>
            <select
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="border p-2 outline-none rounded w-full"
            >
              <option value="">Select a size</option>
              {sizes.map((size) => (
                <option value={size._id} key={size._id}>
                  {size.size}
                </option>
              ))}
            </select>
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
            <label className="text-xl font-semibold mb-1">Price:</label>
            <input
              type="number"
              placeholder="General price"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
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

          <div className="flex flex-col">
            <label className="text-xl font-semibold mb-1">Minimum Order:</label>
            <input
              type="text"
              placeholder="Write in only number..."
              onChange={(e) => setOrder(e.target.value)}
              value={order}
              className="border p-2 outline-none rounded w-full"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-xl font-semibold mb-1">Perfect for:</label>
            <input
              type="text"
              placeholder="Comma-separated values e.g. Gifts, Weddings, Birthdays"
              onChange={(e) => setPerfectFor(e.target.value)}
              value={perfectFor}
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
