import Banner from "@/components/home/Banner";
import Products from "@/components/home/Products";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import Image from "next/image";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <div className="space-y-20">
      <section>
        <Banner></Banner>
      </section>
      <section>
        <Products></Products>
      </section>
    </div>
  );
}
