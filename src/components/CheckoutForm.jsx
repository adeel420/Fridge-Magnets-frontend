"use client";

import { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { handleError, handleSuccess } from "@/app/utils";
import { BounceLoader } from "react-spinners";
import { useRouter } from "next/navigation";
import { Modal } from "antd";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#ffffff",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      "::placeholder": { color: "#a0aec0" },
    },
    invalid: {
      color: "#e53e3e",
      iconColor: "#e53e3e",
    },
  },
  hidePostalCode: true,
};

const CheckoutForm = ({ amount, handleDeleteAll }) => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  const [clientSecret, setClientSecret] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [proceedAsGuest, setProceedAsGuest] = useState(false);
  const [modalText] = useState(
    "Are you sure you want to checkout without creating an account?"
  );

  const showModal = () => setOpen(true);
  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setProceedAsGuest(true);
      setOpen(false);
      setConfirmLoading(false);
    }, 1000);
  };
  const handleCancel = () => setOpen(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/user/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data))
      .catch((err) => console.error("Login fetch failed:", err));
  }, []);

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/payment/create-payment-intent`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      }
    )
      .then((res) => res.json())
      .then((data) => data.clientSecret && setClientSecret(data.clientSecret))
      .catch((err) => console.error("Error creating payment intent:", err));
  }, [amount]);

  useEffect(() => {
    if (proceedAsGuest) handleSubmit();
  }, [proceedAsGuest]);

  const handleSubmit = async () => {
    if (
      !stripe ||
      !elements ||
      !clientSecret ||
      !phone ||
      !address ||
      (!user && (!name || !email))
    )
      return;
    setLoading(true);

    try {
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: elements.getElement(CardElement) },
      });

      if (result.error)
        return handleError(`Payment failed: ${result.error.message}`);

      if (result.paymentIntent.status === "succeeded") {
        let cartItems = [];
        if (user?.id) {
          const cartRes = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/cart/${user.id}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          cartItems = cartRes.data[0]?.products || [];
        }

        const products = cartItems.map((item) => ({
          product: item.product,
          size: item.sizeId || item.size || null,
          images: item.uploadedImages?.images?.map((img) => img.url) || [],
        }));

        const orderData = {
          products,
          payment: {
            id: result.paymentIntent.id,
            amount: result.paymentIntent.amount,
            status: result.paymentIntent.status,
          },
          buyer: user?.id || null,
          name,
          email,
          phone,
          address,
          status: "processing",
          sizeId: products[0]?.size || null,
        };

        const orderRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/payment`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(orderData),
          }
        );

        const orderResJson = await orderRes.json();
        if (!orderRes.ok)
          return handleError(orderResJson.error || "Failed to save order.");

        if (user?.id) await handleDeleteAll(user.id);

        handleSuccess("✅ Payment successful!");
        router.push("/my-account");
      }
    } catch (error) {
      console.error("Payment processing error:", error);
      handleError("Payment processing failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        if (!token) return showModal();
        handleSubmit();
      }}
      className="max-w-md mx-auto space-y-4 border-2 p-4 rounded"
    >
      {loading && (
        <div
          className="fixed top-0 left-0 h-full w-full bg-[#00000041]"
          style={{ zIndex: 1111111111 }}
        >
          <div
            className="absolute top-1/2 left-1/2"
            style={{ transform: "translate(-50%, -50%)" }}
          >
            <BounceLoader color="#dd492b" />
          </div>
        </div>
      )}

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="w-full border px-3 py-2 rounded"
      />
      <input
        type="email"
        placeholder="email@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full border px-3 py-2 rounded"
      />
      <input
        type="text"
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
        className="w-full border px-3 py-2 rounded"
      />
      <input
        type="text"
        placeholder="Shipping Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        required
        className="w-full border px-3 py-2 rounded"
      />

      <div className="bg-gray-800 text-white rounded-xl p-6 w-full shadow-lg space-y-4">
        <h2 className="text-lg font-semibold">Card Information</h2>
        <div className="border border-gray-600 rounded-md p-4">
          <CardElement options={CARD_ELEMENT_OPTIONS} />
        </div>
        <button
          type="submit"
          disabled={!stripe || !clientSecret}
          className="bg-[#dd492b] w-full text-white py-2 rounded hover:bg-[#b9371d]"
        >
          Pay Now
        </button>
      </div>

      <Modal
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p className="mt-8">{modalText}</p>
      </Modal>
    </form>
  );
};

export default CheckoutForm;
