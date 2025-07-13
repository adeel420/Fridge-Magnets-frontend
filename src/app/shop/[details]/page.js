"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MdOutlineFileUpload } from "react-icons/md";
import { IoCart, IoClose } from "react-icons/io5";
import { handleError, handleSuccess } from "@/app/utils";
import axios from "axios";
import Image from "next/image";
import { BounceLoader } from "react-spinners";

const Details = () => {
  const [selectedImg, setSelectedImg] = useState(null);
  const [product, setProduct] = useState(null);
  const [size, setSize] = useState("");
  const [popup, setPopup] = useState(false);
  const [imageData, setImageData] = useState([]); // [{ file, message }]
  const [next, setNext] = useState([]);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState("");
  const [user, setUser] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [token, setToken] = useState("");

  const router = useRouter();
  const params = useParams();
  const id = params.details;

  useEffect(() => {
    setToken(localStorage.getItem("token") || "");
  }, []);

  const handlePopup = () => setPopup(!popup);

  useEffect(() => {
    if (!id) return;
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/product/${id}`
        );
        const data = res.data;
        setProduct(data);
        setSelectedImg(data?.images?.[0]?.url || null);
        setSize(data?.size || "");
      } catch (err) {
        handleError(err);
      }
    };
    fetchProduct();
  }, [id]);

  const fetchComments = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/comment/${id}`
      );
      setComments(res.data);
    } catch (error) {
      handleError("Failed to load comments");
      console.log(error);
    }
  };

  useEffect(() => {
    if (!id) return;
    fetchComments();
  }, [id]);

  const handleComment = async (e) => {
    e.preventDefault();
    if (!token)
      return handleError("Please create an account before posting comments");
    if (!rating || !comment)
      return handleError("Please enter rating and comment");

    setLoading(true);
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/comment/`,
        { comment, rating, user: user.id, product: id },
        { headers: { "Content-Type": "application/json" } }
      );
      setComment("");
      setRating("");
      fetchComments();
      handleSuccess("Comment posted successfully");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGetBySize = async (sizeId) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/product/size/${sizeId}`
      );
      const data = res.data;
      if (data.length > 0) {
        setProduct(data[0]);
        setSelectedImg(data[0]?.images?.[0]?.url || null);
      }
    } catch (err) {
      handleError(err);
    }
  };

  useEffect(() => {
    if (size) handleGetBySize(size);
  }, [size]);

  const handleLogin = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
    } catch (err) {
      handleError("Login failed:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    handleLogin();
  }, []);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const maxFiles = product?.orders || 0;
    if (imageData.length + selectedFiles.length > maxFiles) {
      return handleError(`You must upload exactly ${maxFiles} images.`);
    }
    const newData = selectedFiles.map((file) => ({ file, message: "" }));
    setImageData((prev) => [...prev, ...newData]);
  };

  const handleMessageChange = (i, value) => {
    setImageData((prev) =>
      prev.map((item, idx) => (idx === i ? { ...item, message: value } : item))
    );
  };

  const removeImage = (index) => {
    setImageData((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClickNext = () => {
    if (imageData.length.toString() === product?.orders) {
      setPopup(false);
      setNext(imageData);
    } else {
      handleError(`You must upload exactly ${product.orders} images.`);
    }
  };

  const handleSubmitAndAddToCart = async () => {
    // if (!token)
    //   return handleError(
    //     "Please create an account before adding items to your cart."
    //   );
    if (imageData.length !== Number(product?.orders)) {
      return handleError(`You must upload exactly ${product.orders} images.`);
    }
    let cartId = localStorage.getItem("cartId");
    if (!cartId) {
      cartId = crypto.randomUUID(); // or use `uuid` package
      localStorage.setItem("cartId", cartId);
    }

    const formData = new FormData();
    imageData.forEach((item) => formData.append("images", item.file));
    formData.append(
      "messages",
      JSON.stringify(imageData.map((item) => item.message))
    );

    formData.append("product", product._id);

    setLoading(true);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/image/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const uploadedImageDocId = res.data?._id;
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/cart/`, {
        cartId,
        productId: res.data.product,
        uploadedImageId: uploadedImageDocId,
        sizeId: size,
        quantity: 1,
      });

      handleSuccess("All items added to cart!");
      setImageData([]);
      setPopup(false);
      router.push("/cart");
    } catch (err) {
      const message =
        err.response?.data?.error || err.message || "Upload or cart failed";
      handleError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleGetSize = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/size/`);
      setSizes(res.data || []);
    } catch (err) {
      handleError(err);
    }
  };

  useEffect(() => {
    handleGetSize();
  }, []);

  return (
    <div className="pt-42 px-4 sm:px-6 lg:px-8 pb-20 max-w-7xl mx-auto">
      {loading && (
        <div
          className="fixed top-[0] left-[0] h-[100%] w-[100%] bg-[#00000041]"
          style={{ zIndex: 1111111111 }}
        >
          <div
            className="absolute top-[50%] left-[50%] "
            style={{ transform: "translate(-50%, -50%)" }}
          >
            <BounceLoader color="#dd492b" />
          </div>
        </div>
      )}
      <div className="flex flex-col lg:flex-row gap-10 px-4 sm:px-6 md:px-10 py-6">
        {/* LEFT SIDE - Images */}
        <div className="w-full lg:w-1/2">
          {next.length > 0 ? (
            <div className="bg-[#fef3ef] p-4 sm:p-6 rounded-lg shadow-md">
              <div className="relative w-full mx-auto">
                <Image
                  src="https://res.cloudinary.com/dyyuwwbaq/image/upload/v1750951100/fridge_zgmzrt.png"
                  alt="Fridge"
                  priority
                  width={800}
                  height={200}
                  className="w-full h-auto object-contain"
                />
                <div className="absolute top-[5%] left-[32%] flex flex-wrap gap-2 w-[40%] z-10">
                  <div className="grid grid-cols-3 gap-3">
                    {next.map((file, index) => {
                      const fileUrl = URL.createObjectURL(file.file);

                      const tilt = index % 2 === 0 ? "-rotate-3" : "rotate-2";

                      return (
                        <div
                          key={index}
                          className={`bg-white p-[2px] rounded shadow-md ${tilt} transform transition-transform`}
                        >
                          <Image
                            src={fileUrl}
                            alt={`uploaded-${index}`}
                            width={60}
                            height={60}
                            className="object-cover w-[60px] h-[60px] rounded"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="flex justify-center p-4 rounded-lg">
                {selectedImg && (
                  <Image
                    src={selectedImg}
                    alt="Selected"
                    width={400}
                    height={400}
                    className="w-full max-w-md h-auto max-h-[400px] object-contain"
                  />
                )}
              </div>
              <div className="flex flex-wrap justify-center gap-3 mt-4">
                {product?.images?.map((imgObj, idx) =>
                  imgObj?.url ? (
                    <Image
                      key={idx}
                      src={imgObj.url}
                      width={60}
                      height={60}
                      alt={`thumb-${idx}`}
                      onClick={() => setSelectedImg(imgObj.url)}
                      className={`object-contain cursor-pointer rounded border transition ${
                        selectedImg === imgObj.url
                          ? "border-[#dd492b] border-2"
                          : "border-gray-300"
                      }`}
                    />
                  ) : null
                )}
              </div>
            </>
          )}
        </div>

        {/* RIGHT SIDE - Product Details */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold">
            {product?.title}
          </h1>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <p className="text-lg sm:text-xl lg:text-2xl font-bold text-[#dd492b]">
              £ {product?.price}
            </p>
            <p className="text-base sm:text-lg lg:text-xl font-bold">
              Order: <span className="text-[#dd492b]">{product?.orders}</span>
            </p>
          </div>

          <div>
            <label className="block font-semibold mb-1 text-base sm:text-lg">
              Size:
            </label>
            <select
              value={size}
              onChange={(e) => {
                setSize(e.target.value);
                handleGetBySize(e.target.value);
              }}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-[#dd492b] focus:outline-none"
            >
              {sizes && sizes.length > 0 ? (
                sizes.map((sizeItem) => (
                  <option value={sizeItem._id} key={sizeItem._id}>
                    {sizeItem.size}
                  </option>
                ))
              ) : (
                <option disabled>No sizes available</option>
              )}
            </select>
          </div>

          <div>
            <h2 className="font-semibold text-base sm:text-lg mb-1">
              Description:
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              {product?.description}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <button
              onClick={handlePopup}
              className="flex items-center justify-center gap-2 border border-[#212529] hover:bg-[#212529] hover:text-white transition px-4 py-2 rounded text-sm sm:text-base"
            >
              <MdOutlineFileUpload /> Upload
            </button>
            <button
              onClick={handleSubmitAndAddToCart}
              className="flex items-center justify-center gap-2 bg-[#dd492b] hover:bg-[#bd391e] text-white px-4 py-2 rounded transition text-sm sm:text-base"
            >
              <IoCart /> Add to Cart
            </button>
          </div>

          <div>
            <h2 className="font-semibold text-base sm:text-lg mb-1">
              Perfect For:
            </h2>
            <ul className="list-disc list-inside text-sm sm:text-base text-gray-600">
              {product?.perfectFor?.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Modal */}
      {popup && (
        <div className="fixed inset-0 bg-[#00000066] bg-opacity-60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto relative p-6">
            {/* Close Button */}
            <button
              onClick={handlePopup}
              className="absolute top-3 right-3 text-gray-600 hover:text-black transition"
            >
              <IoClose size={24} />
            </button>

            {/* Title */}
            <h1 className="text-center font-semibold text-xl text-[#dd492b] mb-3">
              Upload Images and Text
            </h1>

            {/* Info Text */}
            <p className="text-sm text-gray-600 text-center mb-4">
              You must upload exactly{" "}
              <span className="text-[#dd492b] font-semibold">
                {product?.orders}
              </span>{" "}
              image{product?.orders > 1 ? "s" : ""}.
            </p>

            {/* Upload Button */}
            <label className="cursor-pointer border border-dashed border-[#dd492b] text-[#dd492b] w-20 h-20 flex items-center justify-center rounded-full text-3xl mx-auto mb-4 transition hover:bg-[#dd492b10]">
              +
              <input
                type="file"
                hidden
                multiple
                accept="image/*"
                onChange={handleFileChange}
              />
            </label>

            {/* Preview Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
              {imageData.map((item, index) => (
                <div
                  key={index}
                  className="relative flex flex-col items-center border border-gray-200 rounded-lg p-2 shadow-sm"
                >
                  <Image
                    src={URL.createObjectURL(item.file)}
                    alt="preview"
                    width={80}
                    height={80}
                    className="object-cover rounded w-20 h-20"
                  />
                  {/* Message Input */}
                  {product?.title === "Personalised Message Magnet" && (
                    <input
                      type="text"
                      value={item.message}
                      onChange={(e) =>
                        handleMessageChange(index, e.target.value)
                      }
                      placeholder="Message"
                      className="mt-2 p-1 border text-sm rounded w-full focus:outline-none focus:ring-1 focus:ring-[#dd492b]"
                    />
                  )}
                  {/* Remove Button */}
                  <button
                    onClick={() => removeImage(index)}
                    className="absolute top-[-6px] right-[-6px] bg-white text-black border border-gray-300 rounded-full shadow p-1 text-xs hover:bg-[#dd492b] hover:text-white transition"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={handleClickNext}
              className="w-full bg-[#dd492b] hover:bg-[#c3411f] text-white py-2 rounded-lg font-semibold shadow transition"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Reviews */}
      <div className="mt-42">
        <h2 className="font-semibold text-lg mb-2 text-gray-800">
          Customer Reviews
        </h2>

        {/* Existing Reviews */}
        <div className="space-y-4">
          {comments && comments.length > 0 ? (
            comments.map((comment) => (
              <div
                key={comment._id}
                className="border border-gray-200 p-4 rounded-lg shadow-sm bg-white"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 ">
                    <h4 className="cursor-pointer text-white text-[14px] bg-[#dd492b] border border-white rounded-full p-2 h-[30px] w-[30px] flex items-center justify-center ">
                      {comment?.user?.name?.charAt(0)}
                    </h4>
                    <h4 className="font-semibold text-[#dd492b]">
                      {comment?.user?.name}
                    </h4>
                  </div>
                  <p className="text-yellow-500 text-sm">
                    {"★".repeat(comment.rating)}
                    {"☆".repeat(5 - comment.rating)}
                  </p>
                </div>
                <p className="text-gray-600 text-sm mt-1">{comment.comment}</p>
              </div>
            ))
          ) : (
            <h3 className="text-center">No comments here...</h3>
          )}
        </div>

        {/* Submit Review Form */}
        <div className="mt-6">
          <h3 className="text-md font-semibold mb-2">Leave a Review</h3>
          <form onSubmit={handleComment} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Rating
              </label>
              <select
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Select rating</option>
                {[1, 2, 3, 4, 5].map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Comment
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                rows={3}
                placeholder="Write your comment here"
              />
            </div>
            <button
              type="submit"
              className="bg-[#dd492b] hover:bg-[#bd391e] text-white py-2 px-4 rounded cursor-pointer"
            >
              Submit Review
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Details;
