"use client";

import { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { handleError, handleSuccess } from "@/app/utils";
import { BounceLoader } from "react-spinners";
import { useRouter } from "next/navigation";

const EventsForm = ({
  name,
  email,
  phone,
  eventType,
  eventDate,
  eventLocation,
  additionalInfo,
  amount,
  setOpenPopup,
  setName,
  setEmail,
  setPhone,
  setEventType,
  setEventDate,
  setEventLocation,
  setAdditionalInfo,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  // Fetch user info
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
      handleError("Login fetch failed:", err);
    }
  };

  // Create Stripe PaymentIntent
  useEffect(() => {
    if (!amount) return;
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/events-book/create-payment-intent`,
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
          handleError("Failed to get clientSecret.");
        }
      })
      .catch((err) => {
        handleError("Error creating payment intent:", err);
      });
  }, [amount]);

  useEffect(() => {
    handleLogin();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || !clientSecret) return;

    setLoading(true);
    try {
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.paymentIntent.status === "succeeded") {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/events-book/`,
          {
            name,
            email,
            phone,
            eventType,
            eventDate,
            eventLocation,
            additionalInfo,
            payment: {
              id: result.paymentIntent.id,
              amount: result.paymentIntent.amount,
              status: result.paymentIntent.status,
            },
          }
        );

        if (response.data) {
          handleSuccess("🎉 Event booked successfully!");
          setName("");
          setEmail("");
          setPhone("");
          setEventType("");
          setEventDate("");
          setEventLocation("");
          setAdditionalInfo("");
        }
        setOpenPopup(false);
        setTimeout(() => {
          router.refresh();
        }, 2000);
      }
    } catch (err) {
      handleError("Something went wrong during booking.");
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
      <CardElement />
      <button
        type="submit"
        disabled={!stripe || !clientSecret}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Pay Now
      </button>
    </form>
  );
};

export default EventsForm;
