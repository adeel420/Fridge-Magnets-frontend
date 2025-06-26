"use client";

import { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { handleError, handleSuccess } from "@/app/utils";
import { BounceLoader } from "react-spinners";
import { useRouter } from "next/navigation";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#ffffff",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      "::placeholder": {
        color: "#a0aec0",
      },
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
  const [clientSecret, setClientSecret] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const router = useRouter();

  // Fetch user from token
  const handleLogin = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/user/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUser(response.data);
    } catch (err) {
      console.error("Login fetch failed:", err);
    }
  };

  // Fetch client secret from backend
  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/payment/create-payment-intent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
        } else {
          // handleError("Failed to get clientSecret.");
        }
      })
      .catch((err) => {
        console.error("Error creating payment intent:", err);
      });
  }, [amount]);

  useEffect(() => {
    handleLogin();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements || !clientSecret || !phone || !address) return;

    setLoading(true);
    try {
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        handleError(`Payment failed: ${result.error.message}`);
        return;
      }

      if (result.paymentIntent.status === "succeeded") {
        if (!user || !user.id) {
          handleError("User not found or not logged in.");
          return;
        }

        const cartResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/cart/${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const cartItems = cartResponse.data[0]?.products || [];

        const products = cartItems.map((item) => ({
          product: item.product,
          size: item.sizeId || item.size || null,
          images: item.uploadedImages?.images?.map((img) => img.url) || [],
        }));

        products.forEach((p, index) => console.log(`Product ${index + 1}:`, p));

        const orderData = {
          products,
          payment: {
            id: result.paymentIntent.id,
            amount: result.paymentIntent.amount,
            status: result.paymentIntent.status,
          },
          buyer: user.id,
          phone,
          address,
          status: "processing",
          sizeId: products[0]?.size || null,
        };

        // Save order to backend
        const orderResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/payment`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(orderData),
          }
        );

        const orderDataResponse = await orderResponse.json();

        if (!orderResponse.ok) {
          handleError(
            orderDataResponse.error || "Failed to save order. Please try again."
          );
          return;
        }
        await handleDeleteAll(user.id);
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
      onSubmit={handleSubmit}
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
    </form>
  );
};

export default CheckoutForm;
