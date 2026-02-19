"use client";

import Checkout from "@/components/home/Checkout";
import React from "react";

const CheckOutPage = () => {
  return (
    <div>
      <div className="">
        <h2 className="text-4xl py-4 font-bold border-l-8 border-primary pl-8">
          Check Out Now
        </h2>
      </div>
      <Checkout />
    </div>
  );
};

export default CheckOutPage;
