import { getSingleProduct, ProductDetails, SimilarProducts } from "@/features/products";
import React from "react";

export async function generateMetadata({ params }) {
    const { id } = await params;
    const product = await getSingleProduct(id);
    return {
        title: product?.title || "Product Details",
        description: product?.description || "Product details from Hero Kidz",
        openGraph: {
            images: [product?.image],
        },
    };
}

const ProductDetailsPage = async ({ params }) => {
    const { id } = await params;
    const product = await getSingleProduct(id);

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <ProductDetails product={product} />
            <SimilarProducts id={id} />
        </div>
    );
};

export default ProductDetailsPage;
