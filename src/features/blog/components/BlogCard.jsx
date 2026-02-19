import React from "react";
import Link from "next/link";
import Image from "next/image";

const BlogCard = ({ blog }) => {
  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
      <figure className="relative h-48 w-full">
        <Image
          src={blog.image}
          alt={blog.name}
          fill
          className="object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-primary">{blog.name}</h2>
        <p className="text-gray-600 text-sm line-clamp-3">
          {blog.description}
        </p>
        <div className="card-actions justify-end mt-4">
          <Link href={`/blog/${blog._id}`} className="btn btn-primary btn-sm">
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
