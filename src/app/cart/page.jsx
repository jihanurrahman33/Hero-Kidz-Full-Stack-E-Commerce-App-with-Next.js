import { getCart } from "@/actions/server/cart";
import CartItem from "@/components/CartItem";
import React from "react";

const CartPage = async () => {
  const cartItems = await getCart();

  return (
    <div>
      <div className="">
        <h2 className="text-4xl py-4 font-bold border-l-8 border-primary pl-8">
          My Cart
        </h2>
        <p className="px-3 py-3 ">
          <span className="text-primary font-bold">
            {cartItems.cart.length}{" "}
          </span>
          Items Found in the Cart
        </p>
      </div>
      <div className="flex ">
        <div className="flex-3  space-y-4 p-4">
          {cartItems.cart.map((item) => (
            <CartItem key={item._id.toString()} item={item}></CartItem>
          ))}
        </div>
        <div className="flex-1"></div>
      </div>
    </div>
  );
};

export default CartPage;
