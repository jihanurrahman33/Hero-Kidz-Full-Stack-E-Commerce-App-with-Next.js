import { Banner, ProductGrid } from "@/features/products";
import CategoryGrid from "@/features/products/components/CategoryGrid";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Testimonials from "@/components/home/Testimonials";
import Newsletter from "@/components/home/Newsletter";

export default function Home() {
  return (
    <>
      <Banner />
      <CategoryGrid />
      <section className="py-8 px-4">
        <h2 className="text-center text-4xl font-bold mb-10">Our Products</h2>
        <ProductGrid />
      </section>
      <WhyChooseUs />
      <Testimonials />
      <Newsletter />
    </>
  );
}
