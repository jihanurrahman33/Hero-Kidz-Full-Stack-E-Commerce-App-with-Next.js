import { fontBangla } from "@/app/layout";
import Image from "next/image";
import React from "react";

const Banner = () => {
  return (
    <section className="flex flex-col-reverse md:flex-row items-center justify-between gap-10 px-4 md:px-12 py-10">
      {/* Text Content */}
      <div className="flex-1 space-y-5 text-center md:text-left">
        <h2
          className={`${fontBangla.className} text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight`}
        >
          আপনার শিশুকে দিন একটি{" "}
          <span className="text-primary">সুন্দর ভবিষ্যৎ</span>
        </h2>

        <p className="text-gray-600 text-sm sm:text-base">
          Buy Every Toy with up to 15% discount
        </p>

        <button className="btn btn-primary btn-outline">
          Explore Products
        </button>
      </div>

      {/* Image */}
      <div className="flex-1 flex justify-center">
        <Image
          src="/assets/hero.png"
          alt="Buy Every Toy with up to 15% discount"
          width={500}
          height={400}
          className="w-full max-w-sm md:max-w-md lg:max-w-lg"
          priority
        />
      </div>
    </section>
  );
};

export default Banner;
