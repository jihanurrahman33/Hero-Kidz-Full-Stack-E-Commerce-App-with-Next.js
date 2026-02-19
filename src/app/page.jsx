import { Banner, ProductGrid } from "@/features/products";
import CategoryGrid from "@/features/products/components/CategoryGrid";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Testimonials from "@/components/home/Testimonials";
import Newsletter from "@/components/home/Newsletter";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Banner />
      <CategoryGrid />
      <section className="py-8 px-4">
        <h2 className="text-center text-4xl font-bold mb-10">Our Products</h2>
        <ProductGrid filters={{ limit: 8 }} />
        <div className="text-center mt-8">
          <Link href="/products" className="btn btn-outline btn-primary">
            View All Products →
          </Link>
        </div>
      </section>
      <WhyChooseUs />
      <Testimonials />
      <Newsletter />
    </>
  );
}
