"use client";
import { createOrder } from "@/actions/server/Order";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useMemo } from "react";
import Swal from "sweetalert2";

const Checkout = ({ cartItems = [] }) => {
  const session = useSession();
  const router = useRouter();

  const totalPrice = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const orderPayload = {
      name: form.name.value,
      email: form.email.value,
      contact: form.phone.value,
      address: form.address.value,
      instruction: form.instruction.value,
    };

    const result = await createOrder(orderPayload);

    if (result.success) {
      Swal.fire(
        "Order Placed!",
        "Your order has been placed successfully.",
        "success"
      );
      form.reset();
      router.push("/");
    } else {
      Swal.fire("Order Failed", "Please try again.", "error");
      router.push("/cart");
    }
  };

  if (session.status === "loading") {
    return <p className="text-center py-10">Loading...</p>;
  }

  return (
    <div className="max-w-7xl mx-auto p-4 lg:p-6">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* LEFT — CHECKOUT FORM */}
        <form
          onSubmit={handleSubmit}
          className="w-full lg:w-2/3 bg-white rounded-xl shadow-md p-5 space-y-4"
        >
          <h2 className="text-lg font-semibold">Billing & Delivery Info</h2>

          {/* Name + Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              className="input input-bordered w-full"
              value={session?.data?.user?.name}
              readOnly
            />

            <input
              type="email"
              name="email"
              className="input input-bordered w-full"
              value={session?.data?.user?.email}
              readOnly
            />
          </div>

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            className="input input-bordered w-full"
            required
          />

          <textarea
            name="address"
            placeholder="Delivery Address"
            className="textarea textarea-bordered w-full"
            rows={3}
            required
          />

          <textarea
            name="instruction"
            placeholder="Special Instructions (optional)"
            className="textarea textarea-bordered w-full"
            rows={2}
          />

          <button className="btn btn-primary w-full mt-4">
            Check Out With COD
          </button>
        </form>

        {/* RIGHT — ORDER SUMMARY */}
        <div className="w-full lg:w-1/3">
          <div className="bg-white rounded-xl shadow-md p-5 lg:sticky lg:top-4">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

            <div className="space-y-3 max-h-64 overflow-auto">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between text-sm border-b pb-2"
                >
                  <div>
                    <p className="font-medium line-clamp-1">{item.title}</p>
                    <p className="text-gray-500">
                      Qty: {item.quantity} × ৳{item.price}
                    </p>
                  </div>
                  <p className="font-semibold">৳{item.price * item.quantity}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>৳{totalPrice}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
