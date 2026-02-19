import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft, FaCalendarAlt, FaUser, FaTag } from "react-icons/fa";

const BlogDetails = ({ blog }) => {
  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      {/* Back Link */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-primary hover:underline mb-6"
      >
        <FaArrowLeft size={14} />
        Back to Blog
      </Link>

      {/* Hero Image */}
      <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden shadow-lg mb-8">
        <Image
          src={blog.image}
          alt={blog.name}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Meta Info */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
        {blog.author && (
          <span className="inline-flex items-center gap-1.5">
            <FaUser size={12} />
            {blog.author}
          </span>
        )}
        {blog.date && (
          <span className="inline-flex items-center gap-1.5">
            <FaCalendarAlt size={12} />
            {blog.date}
          </span>
        )}
      </div>

      {/* Tags */}
      {blog.tags && blog.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {blog.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full"
            >
              <FaTag size={10} />
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Title */}
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-800 leading-tight mb-6">
        {blog.name}
      </h1>

      {/* Description */}
      <p className="text-lg text-gray-600 border-l-4 border-primary pl-4 mb-8 italic">
        {blog.description}
      </p>

      {/* Content */}
      <div className="prose prose-lg max-w-none prose-headings:text-gray-800 prose-p:text-gray-600 prose-strong:text-gray-700 prose-li:text-gray-600 whitespace-pre-line leading-relaxed">
        {blog.content}
      </div>

      {/* Bottom CTA */}
      <div className="mt-12 pt-8 border-t text-center">
        <h3 className="text-xl font-bold mb-2">Enjoyed this article?</h3>
        <p className="text-gray-500 mb-4">Check out more articles on our blog.</p>
        <Link href="/blog" className="btn btn-primary">
          View All Articles
        </Link>
      </div>
    </article>
  );
};

export default BlogDetails;
