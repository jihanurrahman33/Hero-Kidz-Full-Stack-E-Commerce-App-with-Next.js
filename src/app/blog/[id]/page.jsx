import { notFound } from "next/navigation";
import blogs from "@/features/blog/data/blogs";
import BlogDetails from "@/features/blog/components/BlogDetails";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const blog = blogs.find((b) => b._id === Number(id));
  if (!blog) return { title: "Blog Not Found" };
  return {
    title: blog.name,
    description: blog.description,
  };
}

export default async function BlogDetailPage({ params }) {
  const { id } = await params;
  const blog = blogs.find((b) => b._id === Number(id));
  if (!blog) return notFound();

  return <BlogDetails blog={blog} />;
}
