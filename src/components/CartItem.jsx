"use client";

import Image from "next/image";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import { useCart } from "@/contexts/CartContext";
import useAlert from "@/hooks/useAlert";
import useAsync from "@/hooks/useAsync";

const CartItem = ({ item }) => {
  const { title, price, quantity, image, _id } = item;
  const { removeFromCart, increaseQty, decreaseQty } = useCart();
  const { confirmAction, showSuccess, showError } = useAlert();
  const { execute, loading } = useAsync();

  const handleDeleteCart = async () => {
    const confirmed = await confirmAction(
        "Are you sure?",
        "You won't be able to revert this!",
        "Yes, delete it!"
    );

    if (confirmed) {
        await execute(async () => {
             const result = await removeFromCart(_id);
             if (result.success) {
                 showSuccess("Deleted!", "Your item has been deleted.");
             } else {
                 showError("Error!", "There was an error deleting the item.");
             }
        });
    }
  };

  const onIncrease = async () => {
      await execute(async () => {
          const result = await increaseQty(_id, quantity);
          if (result.success) {
              // showToast("Item quantity increased"); // Optional: logic moved to context or just optimistic update
          }
      });
  };

  const onDecrease = async () => {
       await execute(async () => {
          const result = await decreaseQty(_id, quantity);
          if (result.success) {
              // showToast("Item quantity decreased");
          }
      });
  };

  return (
    <div className="flex items-center gap-4 bg-base-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition border border-base-200/50">
      {/* Product Image */}
      <div className="w-20 h-20 relative">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover rounded-xl"
        />
      </div>

      {/* Product Info */}
      <div className="flex-1">
        <h3 className="font-semibold text-gray-800 line-clamp-2">{title}</h3>

        <p className="text-sm text-gray-500 mt-1">
          Price: <span className="font-medium text-primary">৳{price.toLocaleString()}</span>
        </p>

        {/* Quantity Controller */}
        <div className="flex items-center gap-2 mt-3 bg-base-200 w-max rounded-lg p-1">
           <button
             onClick={onDecrease}
             disabled={quantity <= 1 || loading}
             className="w-8 h-8 rounded-md flex items-center justify-center bg-base-100 shadow-sm hover:text-primary disabled:opacity-50 transition-colors"
           >
             <FaMinus size={12}/>
           </button>

           <span className="w-8 text-center text-sm font-bold">{quantity}</span>

           <button
             disabled={quantity >= 10 || loading}
             onClick={onIncrease}
             className="w-8 h-8 rounded-md flex items-center justify-center bg-base-100 shadow-sm hover:text-primary transition-colors"
           >
             <FaPlus size={12}/>
           </button>
         </div>
      </div>

      {/* Remove Button */}
      <div>
        <button
          onClick={handleDeleteCart}
          className="btn btn-sm btn-circle btn-ghost text-error hover:bg-error/10 border-none"
          disabled={loading}
          title="Remove Item"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
