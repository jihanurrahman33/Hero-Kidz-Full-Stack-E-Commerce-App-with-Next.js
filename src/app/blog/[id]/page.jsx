import { notFound } from "next/navigation";
import blogs from "@/features/blog/data/blogs";
import BlogDetails from "@/features/blog/components/BlogDetails";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

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

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumbs items={[
        { label: "Blog", href: "/blog" },
        { label: blog.name },
      ]} />
      <BlogDetails blog={blog} />
    </div>
  );
}
