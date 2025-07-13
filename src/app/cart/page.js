"use client";

export const dynamic = "force-dynamic";
import { useEffect, useState } from "react";
import { IoTrash } from "react-icons/io5";
import { handleError, handleSuccess } from "@/app/utils";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "@/components/CheckoutForm";
import axios from "axios";
import Image from "next/image";
import { Button, Modal } from "antd";
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const Page = () => {
  const [cart, setCart] = useState({ products: [] });
  const [user, setUser] = useState({});
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [userEmail, setUserName] = useState("");
  const [previousBuyers, setPreviousBuyers] = useState([]);

  const handleLogin = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/user/`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setUser(response.data);
      setUserName(response.data.email);
    } catch (err) {
      handleError("Login failed:", err.response?.data || err.message);
    }
  };

  const handleGetCart = async () => {
    const cartId = localStorage.getItem("cartId");
    if (!cartId) return;

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/cart/${cartId}`
      );
      setCart(response.data);
    } catch (err) {
      console.error("Fetch cart failed", err);
    }
  };

  const handleRemove = async (itemId) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/cart/${itemId}`);
      handleSuccess("Item deleted successfully");
      handleGetCart();
    } catch (err) {
      handleError(err);
    }
  };

  const handleDeleteAll = async () => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/cart/user/${user.id}`
      );
      setCart({ products: [] });
    } catch (err) {
      console.error("Delete all error:", err);
    }
  };

  const token = localStorage.getItem("token");

  const handleApplyCoupon = () => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) {
      return handleError("Please first login the account for applying coupon");
    }
    if (!couponCode) return handleError("Please enter the code.");
    const formattedCode = couponCode.trim().toUpperCase();
    const hasUsedCoupon = previousBuyers.includes(userEmail);

    if (hasUsedCoupon) return handleError("Coupon already used by this user.");
    if (formattedCode !== "WELCOME10")
      return handleError("Please enter the correct coupon code.");

    setDiscount(10);
    handleSuccess("Coupon applied: 10% off!");
  };

  useEffect(() => {
    handleLogin();
    handleGetCart();
  }, []);

  useEffect(() => {
    const fetchPreviousBuyers = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/payment/${user.id}`
        );
        const emails = res.data.map((order) => order.buyer.email);
        setPreviousBuyers(emails);
      } catch (err) {
        console.log("Payment history error:", err);
      }
    };

    if (user.id) fetchPreviousBuyers();
  }, [user.id]);

  const originalTotal = cart.products.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const discountedTotal = originalTotal - (originalTotal * discount) / 100;

  return (
    <div className="pt-42 px-4 sm:px-6 lg:px-8 pb-20 max-w-7xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-semibold mb-6 text-center">
        My Cart
      </h1>

      {cart.products.length === 0 ? (
        <p className="text-center border border-dashed border-[#dd492b] text-[#dd492b] p-4 rounded">
          Your cart is empty...
        </p>
      ) : (
        <div className="space-y-4">
          {/* Table Headers */}
          <div className="hidden md:grid grid-cols-6 font-semibold text-gray-600 border-b pb-2">
            <div>Images</div>
            <div>Title</div>
            <div>Size</div>
            <div>Price</div>
            <div>Remove</div>
          </div>

          {/* Cart Items */}
          {cart.products.map((item) => (
            <div
              key={item._id}
              className="grid grid-cols-1 md:grid-cols-6 items-center border border-dashed border-[#dd492b] rounded p-4 gap-4"
            >
              {/* Images */}
              <div className="flex gap-2 flex-wrap">
                {item?.uploadedImages?.images?.map((img, idx) => (
                  <Image
                    key={idx}
                    src={img.url}
                    alt={`cart-img-${idx}`}
                    width={56}
                    height={56}
                    className="object-cover rounded"
                  />
                ))}
              </div>

              <div className="text-sm font-semibold">{item.product.title}</div>
              <div className="text-sm font-medium">{item?.size?.size}</div>
              <div className="text-right sm:text-left font-bold text-lg">
                <span className="text-[#dd492b]">£ {item.product.price}</span>
              </div>
              <div>
                <button
                  onClick={() => handleRemove(item._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <IoTrash size={20} />
                </button>
              </div>
            </div>
          ))}

          {/* Coupon Section */}
          <div className="flex items-end justify-end">
            <div className="mt-6 p-6 border border-[#dd492b] w-full max-w-[450px] rounded-xl bg-white shadow-md space-y-4">
              <h2 className="text-xl font-semibold text-[#dd492b]">
                🎁 Apply Coupon
              </h2>
              <p className="text-sm text-gray-700">
                <span className="font-medium text-[#dd492b]">10% off</span> your
                first order! Use code:{" "}
                <span className="font-semibold text-[#dd492b]">WELCOME10</span>
              </p>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) =>
                    setCouponCode(e.target.value.toUpperCase().slice(0, 9))
                  }
                  placeholder="Enter coupon code"
                  className={`w-full sm:w-72 px-4 py-2 border ${
                    couponCode && couponCode !== "WELCOME10"
                      ? "border-red-500"
                      : "border-[#dd492b]"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#dd492b] placeholder-gray-400`}
                />
                <button
                  onClick={handleApplyCoupon}
                  disabled={couponCode !== "WELCOME10"}
                  className={`px-6 py-2 rounded-lg font-medium transition-all cursor-pointer ${
                    couponCode === "WELCOME10"
                      ? "bg-[#dd492b] text-white hover:bg-[#c03f25]"
                      : "bg-gray-300 text-gray-600 cursor-not-allowed"
                  }`}
                >
                  Apply
                </button>
              </div>
            </div>
          </div>

          {/* Total & Payment */}
          <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div className="text-right sm:text-left font-bold text-lg">
              {discount > 0 ? (
                <>
                  <p>
                    Subtotal:{" "}
                    <span className="line-through text-gray-500">
                      £ {originalTotal.toFixed(2)}
                    </span>
                  </p>
                  <p>
                    Discount ({discount}%): -£
                    {((originalTotal * discount) / 100).toFixed(2)}
                  </p>
                  <p className="text-[#dd492b]">
                    Total: £ {discountedTotal.toFixed(2)}
                  </p>
                </>
              ) : (
                <p className="text-[#dd492b]">
                  Total: £ {originalTotal.toFixed(2)}
                </p>
              )}
            </div>
            <div className="w-full sm:max-w-md">
              <Elements stripe={stripePromise}>
                <CheckoutForm
                  amount={discountedTotal}
                  handleDeleteAll={handleDeleteAll}
                />
              </Elements>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
