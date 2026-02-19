import { getSingleProduct, ProductDetails, SimilarProducts } from "@/features/products";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
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
            <Breadcrumbs items={[
                { label: "Products", href: "/products" },
                { label: product?.title || "Details" },
            ]} />
            <ProductDetails product={product} />
            <SimilarProducts id={id} />
        </div>
    );
};

export default ProductDetailsPage;
