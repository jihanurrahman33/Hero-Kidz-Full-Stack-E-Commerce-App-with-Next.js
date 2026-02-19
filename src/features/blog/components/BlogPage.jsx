import React from "react";
import blogs from "../data/blogs";
import BlogCard from "./BlogCard";

const BlogPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Our Latest <span className="text-primary">Blog</span></h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore our latest articles on parenting, child development, and the
          best toys for your little ones.
        </p>
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
