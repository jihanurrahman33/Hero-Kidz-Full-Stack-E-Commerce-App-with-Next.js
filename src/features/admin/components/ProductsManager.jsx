"use client";

import React, { useState, useTransition } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  deleteProduct,
  addProduct,
} from "@/features/admin/actions/admin.actions";
import {
  FiPlus,
  FiTrash2,
  FiX,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

const ProductsManager = ({ data }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [showAdd, setShowAdd] = useState(false);

  const handleDelete = async (id, title) => {
    if (!confirm(`Delete "${title}"?`)) return;
    await deleteProduct(id);
    startTransition(() => router.refresh());
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const form = e.target;
    const productData = {
      title: form.title.value,
      price: form.price.value,
      discount: form.discount.value,
      category: form.category.value,
      image: form.image.value,
      description: form.description.value,
      ratings: form.ratings.value,
    };
    const result = await addProduct(productData);
    if (result.success) {
      setShowAdd(false);
      form.reset();
      startTransition(() => router.refresh());
    }
  };

  const goToPage = (p) => {
    router.push(`/dashboard/products?page=${p}`);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Manage Products</h1>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="btn btn-primary btn-sm gap-1"
        >
          {showAdd ? <FiX size={16} /> : <FiPlus size={16} />}
          {showAdd ? "Cancel" : "Add Product"}
        </button>
      </div>

      {/* Add Product Form */}
      {showAdd && (
        <form
          onSubmit={handleAdd}
          className="bg-base-100 rounded-2xl shadow-sm p-5 mb-6 space-y-4"
        >
          <h3 className="font-semibold">New Product</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              name="title"
              placeholder="Product Title"
              className="input input-bordered input-sm w-full rounded-lg"
              required
            />
            <input
              name="category"
              placeholder="Category"
              className="input input-bordered input-sm w-full rounded-lg"
              required
            />
            <input
              name="price"
              type="number"
              placeholder="Price (৳)"
              className="input input-bordered input-sm w-full rounded-lg"
              required
              min={0}
            />
            <input
              name="discount"
              type="number"
              placeholder="Discount (%)"
              className="input input-bordered input-sm w-full rounded-lg"
              min={0}
              max={100}
            />
            <input
              name="image"
              type="url"
              placeholder="Image URL"
              className="input input-bordered input-sm w-full rounded-lg"
              required
            />
            <input
              name="ratings"
              type="number"
              step="0.1"
              placeholder="Rating (0-5)"
              className="input input-bordered input-sm w-full rounded-lg"
              min={0}
              max={5}
            />
          </div>
          <textarea
            name="description"
            placeholder="Product Description"
            className="textarea textarea-bordered w-full rounded-lg text-sm"
            rows={2}
          />
          <button
            type="submit"
            disabled={isPending}
            className="btn btn-primary btn-sm"
          >
            {isPending ? "Adding..." : "Add Product"}
          </button>
        </form>
      )}

      {/* Products Table */}
      <div className="bg-base-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr className="text-gray-400 text-xs bg-base-200/50">
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Discount</th>
                <th>Rating</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.products.map((product) => (
                <tr key={product._id} className="hover">
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg overflow-hidden relative bg-base-300 shrink-0">
                        {product.image && (
                          <Image
                            src={product.image}
                            alt={product.title}
                            fill
                            className="object-cover"
                          />
                        )}
                      </div>
                      <span className="text-sm font-medium line-clamp-1 max-w-[180px]">
                        {product.title}
                      </span>
                    </div>
                  </td>
                  <td className="text-sm">{product.category}</td>
                  <td className="font-semibold">৳{product.price}</td>
                  <td className="text-sm">{product.discount || 0}%</td>
                  <td className="text-sm">⭐ {product.ratings || 0}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(product._id, product.title)}
                      disabled={isPending}
                      className="btn btn-ghost btn-sm btn-circle text-error"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {data.totalPages > 1 && (
          <div className="flex items-center justify-between px-5 py-3 border-t border-base-200">
            <p className="text-sm text-gray-400">
              Page {data.page} of {data.totalPages} ({data.total} products)
            </p>
            <div className="flex gap-1">
              <button
                onClick={() => goToPage(data.page - 1)}
                disabled={data.page <= 1}
                className="btn btn-sm btn-ghost btn-circle disabled:opacity-30"
              >
                <FiChevronLeft size={16} />
              </button>
              <button
                onClick={() => goToPage(data.page + 1)}
                disabled={data.page >= data.totalPages}
                className="btn btn-sm btn-ghost btn-circle disabled:opacity-30"
              >
                <FiChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsManager;
