"use client";

import React, { useState, useTransition } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  deleteProduct,
  addProduct,
  updateProduct,
} from "@/features/admin/actions/admin.actions";
import {
  FiPlus,
  FiTrash2,
  FiX,
  FiChevronLeft,
  FiChevronRight,
  FiEdit2,
} from "react-icons/fi";
import Swal from "sweetalert2";

const ProductsManager = ({ data }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [showAdd, setShowAdd] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleDelete = async (id, title) => {
    if (!confirm(`Delete "${title}"?`)) return;
    await deleteProduct(id);
    startTransition(() => router.refresh());
  };

  // State for dynamic fields
  const [qnaList, setQnaList] = useState([]);
  const [infoList, setInfoList] = useState([""]);
  const [sizes, setSizes] = useState([""]);
  const [colors, setColors] = useState([""]);
  const [tags, setTags] = useState([""]);

  const [learningType, setLearningType] = useState([""]);
  const [skillsDeveloped, setSkillsDeveloped] = useState([""]);

  const handleDynamicArrayChange = (setter, index, value) => {
    setter(prev => {
      const newArr = [...prev];
      newArr[index] = value;
      return newArr;
    });
  };

  const addDynamicArrayItem = (setter) => setter(prev => [...prev, ""]);
  const removeDynamicArrayItem = (setter, index) => setter(prev => prev.filter((_, i) => i !== index));

  const handleQnaChange = (index, field, value) => {
    setQnaList(prev => {
      const newQna = [...prev];
      newQna[index][field] = value;
      return newQna;
    });
  };

  const addQna = () => setQnaList(prev => [...prev, { question: "", answer: "" }]);
  const removeQna = (index) => setQnaList(prev => prev.filter((_, i) => i !== index));

  const handleAdd = async (e) => {
    e.preventDefault();
    const form = e.target;

    const filterEmpty = (arr) => arr.filter(item => item.trim() !== "");

    const productData = {
      title: form.title.value,
      bangla: form.bangla.value,
      image: form.image.value,
      price: Number(form.price.value),
      discount: Number(form.discount.value) || 0,
      sizes: filterEmpty(sizes),
      color: filterEmpty(colors),
      description: form.description.value,
      qna: qnaList.filter(q => q.question.trim() && q.answer.trim()),
      ratings: Number(form.ratings.value) || 0,
      info: filterEmpty(infoList),
      category: form.category.value,
      productType: form.productType.value,
      ageRange: form.ageRange.value,
      learningType: filterEmpty(learningType),
      skillsDeveloped: filterEmpty(skillsDeveloped),
      tags: filterEmpty(tags),
    };

    const result = await addProduct(productData);
    if (result?.success || result) {
      setShowAdd(false);
      form.reset();
      // Reset states
      setQnaList([]);
      setInfoList([""]);
      setSizes([""]);
      setColors([""]);
      setTags([""]);
      setLearningType([""]);
      setSkillsDeveloped([""]);
      
      Swal.fire({
        icon: "success",
        title: "Product Added!",
        text: "The new product has been added successfully.",
        confirmButtonColor: "#10b981", // Success green to match the theme (or primary color)
      });

      startTransition(() => router.refresh());
    } else {
      Swal.fire({
        icon: "error",
        title: "Failed to add product",
        text: "There was an error while adding the product. Please try again.",
        confirmButtonColor: "#ef4444", // Error red
      });
    }
  };

  const goToPage = (p) => {
    router.push(`/dashboard/products?page=${p}`);
  };

  // Helper render for array inputs
  const renderArrayInput = (label, values, setter, placeholder) => (
    <div className="space-y-1">
      <label className="text-xs text-gray-500 font-medium ml-1 flex justify-between items-center">
        {label}
        <button type="button" onClick={() => addDynamicArrayItem(setter)} className="text-primary hover:text-primary-focus p-1 rounded-md hover:bg-primary/10 transition-colors"><FiPlus size={14} /></button>
      </label>
      <div className="space-y-2 max-h-32 overflow-y-auto pr-1">
        {values.map((val, idx) => (
          <div key={idx} className="flex items-center gap-1">
            <input 
              value={val} 
              onChange={(e) => handleDynamicArrayChange(setter, idx, e.target.value)}
              placeholder={placeholder} 
              className="input input-sm w-full rounded-xl bg-base-100 border-transparent focus:border-transparent focus:ring-2 focus:ring-primary/20 transition-all shadow-sm" 
            />
            {values.length > 1 && (
               <button type="button" onClick={() => removeDynamicArrayItem(setter, idx)} className="text-error hover:bg-error/10 p-1.5 rounded-xl transition-colors">
                 <FiTrash2 size={14}/>
               </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Manage Products</h1>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="btn btn-primary btn-sm rounded-xl px-4 gap-2 shadow-sm"
        >
          {showAdd ? <FiX size={16} /> : <FiPlus size={16} />}
          {showAdd ? "Close" : "New Product"}
        </button>
      </div>

      {/* Edit Product Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 overflow-y-auto pt-20 pb-10">
          <div className="bg-base-100 p-8 rounded-[2rem] shadow-xl max-w-lg w-full m-4">
            <h3 className="font-bold text-xl mb-4 text-center">Edit Product</h3>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const form = e.target;
                const updatedData = {
                  title: form.title.value,
                  price: Number(form.price.value),
                  discount: Number(form.discount.value) || 0,
                  category: form.category.value,
                };
                try {
                  const res = await updateProduct(editingProduct._id, updatedData);
                  if (res?.success) {
                    Swal.fire({
                      icon: "success",
                      title: "Product Updated!",
                      text: "The product has been updated successfully.",
                      timer: 2000,
                      showConfirmButton: false,
                    });
                    setEditingProduct(null);
                    startTransition(() => router.refresh());
                  } else {
                    throw new Error("Update failed");
                  }
                } catch (error) {
                  Swal.fire({
                    icon: "error",
                    title: "Update Failed",
                    text: "Could not update the product.",
                  });
                }
              }}
              className="space-y-4"
            >
              <div>
                <label className="text-xs text-gray-500 block mb-1">Title</label>
                <input name="title" defaultValue={editingProduct.title} className="input input-sm w-full input-bordered rounded-xl" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-500 block mb-1">Price</label>
                  <input name="price" type="number" defaultValue={editingProduct.price} className="input input-sm w-full input-bordered rounded-xl" required min={0} />
                </div>
                <div>
                  <label className="text-xs text-gray-500 block mb-1">Discount (%)</label>
                  <input name="discount" type="number" defaultValue={editingProduct.discount || 0} className="input input-sm w-full input-bordered rounded-xl" min={0} max={100} />
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-500 block mb-1">Category</label>
                <input name="category" defaultValue={editingProduct.category} className="input input-sm w-full input-bordered rounded-xl" required />
              </div>

              <div className="flex justify-end gap-3 pt-4 mt-6 border-t border-base-200">
                <button type="button" onClick={() => setEditingProduct(null)} className="btn btn-ghost rounded-xl">Cancel</button>
                <button type="submit" disabled={isPending} className="btn btn-primary rounded-xl">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Product Form */}
      {showAdd && (
        <form
          onSubmit={handleAdd}
          className="bg-base-100 rounded-[2rem] shadow-xl shadow-base-200/50 p-8 mb-8 space-y-8"
        >
          <div className="flex items-center justify-between pb-2">
            <div>
              <h3 className="font-bold text-xl">Add New Product</h3>
              <p className="text-sm text-gray-400 mt-1">Fill in the details below to create a new product catalog entry.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column: Basic Info & Categorization */}
            <div className="space-y-6">
              
              <div className="bg-base-200/40 p-6 rounded-3xl space-y-4">
                <h4 className="font-semibold text-sm text-primary mb-3">Basic Information</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-gray-500 font-medium ml-1 mb-1 block">Title (English) *</label>
                    <input name="title" placeholder="Product Title" className="input input-sm w-full rounded-xl bg-base-100 border-transparent focus:border-transparent focus:ring-2 focus:ring-primary/20 transition-all shadow-sm" required />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 font-medium ml-1 mb-1 block">Title (Bangla)</label>
                    <input name="bangla" placeholder="বাংলা নাম" className="input input-sm w-full rounded-xl bg-base-100 border-transparent focus:border-transparent focus:ring-2 focus:ring-primary/20 transition-all shadow-sm" />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 font-medium ml-1 mb-1 block">Price (৳) *</label>
                    <input name="price" type="number" placeholder="0.00" className="input input-sm w-full rounded-xl bg-base-100 border-transparent focus:border-transparent focus:ring-2 focus:ring-primary/20 transition-all shadow-sm" required min={0} />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 font-medium ml-1 mb-1 block">Discount (%)</label>
                    <input name="discount" type="number" placeholder="0" className="input input-sm w-full rounded-xl bg-base-100 border-transparent focus:border-transparent focus:ring-2 focus:ring-primary/20 transition-all shadow-sm" min={0} max={100} />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-xs text-gray-500 font-medium ml-1 mb-1 block">Image URL *</label>
                    <input name="image" type="url" placeholder="https://..." className="input input-sm w-full rounded-xl bg-base-100 border-transparent focus:border-transparent focus:ring-2 focus:ring-primary/20 transition-all shadow-sm" required />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 font-medium ml-1 mb-1 block">Category *</label>
                    <input name="category" placeholder="Educational Toy" className="input input-sm w-full rounded-xl bg-base-100 border-transparent focus:border-transparent focus:ring-2 focus:ring-primary/20 transition-all shadow-sm" required />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 font-medium ml-1 mb-1 block">Product Type</label>
                    <input name="productType" placeholder="toy" className="input input-sm w-full rounded-xl bg-base-100 border-transparent focus:border-transparent focus:ring-2 focus:ring-primary/20 transition-all shadow-sm" defaultValue="toy" />
                  </div>
                </div>
              </div>

              <div className="bg-base-200/40 p-6 rounded-3xl space-y-4">
                 <h4 className="font-semibold text-sm text-primary mb-3">Attributes & Target</h4>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                   <div>
                     <label className="text-xs text-gray-500 font-medium ml-1 mb-1 block">Age Range</label>
                     <input name="ageRange" placeholder="e.g. 3-6" className="input input-sm w-full rounded-xl bg-base-100 border-transparent focus:border-transparent focus:ring-2 focus:ring-primary/20 transition-all shadow-sm" />
                   </div>
                   <div>
                     <label className="text-xs text-gray-500 font-medium ml-1 mb-1 block">Initial Rating</label>
                     <input name="ratings" type="number" step="0.1" defaultValue="0" className="input input-sm w-full rounded-xl bg-base-100 border-transparent focus:border-transparent focus:ring-2 focus:ring-primary/20 transition-all shadow-sm" min={0} max={5} />
                   </div>
                   {renderArrayInput("Sizes", sizes, setSizes, "e.g Small")}
                   {renderArrayInput("Colors", colors, setColors, "e.g Red")}
                   <div className="sm:col-span-2">
                     {renderArrayInput("Search Tags", tags, setTags, "e.g math, learning")}
                   </div>
                 </div>
              </div>

            </div>

            {/* Right Column: Descriptions & Learning */}
            <div className="space-y-6">

              <div className="bg-base-200/40 p-6 rounded-3xl space-y-4">
                 <h4 className="font-semibold text-sm text-primary mb-3">Details & Information</h4>
                 <div>
                   <label className="text-xs text-gray-500 font-medium ml-1 mb-1 block">Full Description *</label>
                   <textarea name="description" placeholder="Write a detailed product description..." className="textarea w-full rounded-2xl bg-base-100 border-transparent focus:border-transparent focus:ring-2 focus:ring-primary/20 transition-all shadow-sm text-sm p-4" rows={3} required />
                 </div>
                 {renderArrayInput("Key Highlights (Bullet Points)", infoList, setInfoList, "e.g Non-toxic and safe")}
              </div>

              <div className="bg-base-200/40 p-6 rounded-3xl space-y-4">
                 <h4 className="font-semibold text-sm text-primary mb-3">Educational Value</h4>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                   {renderArrayInput("Learning Types", learningType, setLearningType, "e.g Math")}
                   {renderArrayInput("Skills Developed", skillsDeveloped, setSkillsDeveloped, "e.g Focus")}
                 </div>
              </div>

              <div className="bg-base-200/40 p-6 rounded-3xl space-y-4">
                 <div className="flex items-center justify-between mb-3">
                   <h4 className="font-semibold text-sm text-primary">Frequently Asked Questions</h4>
                   <button type="button" onClick={addQna} className="btn btn-xs btn-primary btn-soft rounded-lg gap-1 border-none shadow-sm">
                     <FiPlus size={12}/> Add Q&A
                   </button>
                 </div>
                 
                 {qnaList.length === 0 ? (
                   <div className="py-6 text-center bg-base-100 rounded-2xl shadow-sm border border-transparent border-dashed">
                     <p className="text-xs text-gray-400">No Q&A added yet</p>
                   </div>
                 ) : (
                   <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                     {qnaList.map((qna, idx) => (
                       <div key={idx} className="p-4 bg-base-100 rounded-2xl shadow-sm relative group overflow-hidden">
                         <button type="button" onClick={() => removeQna(idx)} className="absolute top-2 right-2 text-error/40 hover:text-error bg-base-100 p-1 rounded-lg transition-all z-10">
                           <FiX size={16}/>
                         </button>
                         <div className="space-y-3 pr-6">
                           <input 
                              value={qna.question} 
                              onChange={(e) => handleQnaChange(idx, 'question', e.target.value)}
                              className="input input-sm w-full bg-transparent border-none px-0 text-sm font-semibold focus:outline-none focus:ring-0 placeholder:font-normal" 
                              placeholder={`Question ${idx + 1}`} 
                           />
                           <div className="h-px bg-base-200 w-full" />
                           <textarea 
                              value={qna.answer} 
                              onChange={(e) => handleQnaChange(idx, 'answer', e.target.value)}
                              className="textarea textarea-sm w-full bg-transparent border-none px-0 text-xs leading-relaxed focus:outline-none focus:ring-0 resize-none overflow-hidden" 
                              placeholder="Type the answer here..." 
                              rows={2} 
                           />
                         </div>
                       </div>
                     ))}
                   </div>
                 )}
              </div>

            </div>
          </div>

          <div className="flex justify-end pt-6 gap-3">
            <button type="button" onClick={() => setShowAdd(false)} className="btn btn-ghost rounded-xl px-6">
              Cancel
            </button>
            <button type="submit" disabled={isPending} className="btn btn-primary rounded-xl px-8 shadow-md">
              {isPending ? <span className="loading loading-spinner loading-sm"></span> : "Save Product"}
            </button>
          </div>
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
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingProduct(product)}
                        className="btn btn-ghost btn-sm btn-circle text-primary"
                        title="Edit Product"
                      >
                        <FiEdit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(product._id, product.title)}
                        disabled={isPending}
                        className="btn btn-ghost btn-sm btn-circle text-error"
                        title="Delete Product"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
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
