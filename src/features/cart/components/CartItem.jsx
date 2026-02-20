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
    <div className="group flex flex-col sm:flex-row items-start sm:items-center gap-5 bg-base-100/80 rounded-[1.5rem] p-5 shadow-sm hover:shadow-lg hover:shadow-base-200/60 transition-all border border-transparent">
      
      {/* Product Image */}
      <div className="w-24 h-24 shrink-0 relative rounded-2xl overflow-hidden shadow-inner">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
      </div>

      {/* Product Info */}
      <div className="flex-1 w-full space-y-1">
        <div className="flex justify-between items-start gap-3">
          <h3 className="font-bold text-gray-800 line-clamp-2 text-base leading-snug">{title}</h3>
          
          {/* Mobile-only Trash */}
          <button
            onClick={handleDeleteCart}
            disabled={loading}
            className="sm:hidden text-gray-400 hover:text-error hover:bg-error/10 p-2 rounded-xl transition-colors shrink-0"
            aria-label="Remove item"
          >
            <FaTrash size={14} />
          </button>
        </div>

        <p className="text-sm text-gray-500 font-medium">
          Price: <span className="text-primary font-bold">৳{price}</span>
        </p>

        {/* Desktop Layout Bottom Half */}
        <div className="flex items-center justify-between pt-3">
          
          {/* Quantity Controller (Pill style) */}
          <div className="inline-flex items-center gap-3 bg-base-200/50 p-1.5 rounded-full shadow-inner">
            <button
              onClick={onDecrease}
              disabled={quantity <= 1 || loading}
              className="w-7 h-7 flex items-center justify-center rounded-full bg-base-100 text-gray-600 hover:bg-primary hover:text-white disabled:opacity-50 disabled:hover:bg-base-100 disabled:hover:text-gray-600 transition-colors shadow-sm"
              aria-label="Decrease quantity"
            >
              <FaMinus size={10} />
            </button>

            <span className="w-4 text-center text-sm font-bold text-gray-800">{quantity}</span>

            <button
              disabled={quantity >= 10 || loading}
              onClick={onIncrease}
              className="w-7 h-7 flex items-center justify-center rounded-full bg-base-100 text-gray-600 hover:bg-primary hover:text-white disabled:opacity-50 disabled:hover:bg-base-100 disabled:hover:text-gray-600 transition-colors shadow-sm"
              aria-label="Increase quantity"
            >
              <FaPlus size={10} />
            </button>
          </div>

          <div className="text-right hidden sm:flex flex-col items-end gap-1">
             <p className="text-sm font-bold text-gray-800">Total: ৳{price * quantity}</p>
             
             {/* Desktop Remove Button (Soft hover) */}
             <button
               onClick={handleDeleteCart}
               className="text-xs font-semibold text-error/60 hover:text-error flex items-center gap-1.5 px-2 py-1 rounded-lg hover:bg-error/10 transition-colors opacity-0 group-hover:opacity-100 focus-within:opacity-100"
               disabled={loading}
             >
               <FaTrash size={12} /> Remove
             </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CartItem;
