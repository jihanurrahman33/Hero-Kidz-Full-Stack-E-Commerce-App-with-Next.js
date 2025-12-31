import Image from "next/image";
import React from "react";

const blogs = [
  {
    id: 1,
    title: "Why Educational Toys Matter for Kids",
    excerpt:
      "Educational toys help children develop cognitive skills, creativity, and problem-solving abilities from an early age.",
    image:
      "https://images.unsplash.com/photo-1607453998774-d533f65dac99?q=80&w=1200&auto=format&fit=crop",
    date: "Jan 5, 2026",
  },
  {
    id: 2,
    title: "How Playtime Shapes a Child’s Future",
    excerpt:
      "Play is not just fun — it’s a crucial part of learning that shapes emotional and social intelligence.",
    image:
      "https://images.unsplash.com/photo-1504151932400-72d4384f04b3?q=80&w=1200&auto=format&fit=crop",
    date: "Jan 10, 2026",
  },
  {
    id: 3,
    title: "Top 5 Learning Toys for Early Development",
    excerpt:
      "Discover the best learning toys that encourage creativity, logic, and hands-on learning.",
    image:
      "https://images.unsplash.com/photo-1596464716127-f2a82984de30?q=80&w=1200&auto=format&fit=crop",
    date: "Jan 15, 2026",
  },
];

const BlogPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Page Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">Our Blog</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Read helpful articles about kids learning, toys, parenting tips, and
          child development.
        </p>
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden"
          >
            {/* Image */}
            <div className="relative h-48 w-full">
              <Image
                src={blog.image}
                alt={blog.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-5 space-y-3">
              <p className="text-sm text-gray-500">{blog.date}</p>

              <h2 className="text-lg font-semibold line-clamp-2">
                {blog.title}
              </h2>

              <p className="text-gray-600 text-sm line-clamp-3">
                {blog.excerpt}
              </p>

              <button className="btn btn-link text-primary px-0">
                Read More →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
