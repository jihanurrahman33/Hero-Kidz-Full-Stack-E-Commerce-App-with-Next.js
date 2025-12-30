"use client";

import { deleteItemsFromCart } from "@/actions/server/cart";
import Image from "next/image";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

const CartItem = ({ item, onIncrease, onDecrease }) => {
  const { title, price, quantity, image, _id } = item;
  const handleDeleteCart = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const result = await deleteItemsFromCart(_id);

        if (result.success) {
          Swal.fire("Deleted!", "Your item has been deleted.", "success");
        } else {
          Swal.fire("Error!", "There was an error deleting the item.", "error");
        }
      }
    });
  };
  return (
    <div className="flex items-center gap-4 bg-white  rounded-xl p-4 shadow-sm hover:shadow-md transition">
      {/* Product Image */}
      <div className="w-20 h-20 relative">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover rounded-lg"
        />
      </div>

      {/* Product Info */}
      <div className="flex-1">
        <h3 className="font-semibold text-gray-800 line-clamp-2">{title}</h3>

        <p className="text-sm text-gray-500 mt-1">
          Price: <span className="font-medium">৳{price}</span>
        </p>

        {/* Quantity Controller */}
        <div className="flex items-center gap-2 mt-3">
          <button onClick={onDecrease} className="btn btn-sm btn-outline">
            <FaMinus />
          </button>

          <span className="px-3 font-semibold">{quantity}</span>

          <button onClick={onIncrease} className="btn btn-sm btn-outline">
            <FaPlus />
          </button>
        </div>
      </div>

      {/* Remove Button */}
      <div>
        <button
          onClick={handleDeleteCart}
          className="btn btn-sm btn-error btn-outline"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
