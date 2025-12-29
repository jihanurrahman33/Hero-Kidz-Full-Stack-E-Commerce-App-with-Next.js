import { getSingleProduct } from "@/actions/server/product";
import Image from "next/image";
import { FaStar } from "react-icons/fa";

const ProductDetails = async ({ params }) => {
  const { id } = await params;
  const product = await getSingleProduct(id);

  const {
    title,
    bangla,
    image,
    price,
    discount,
    ratings,
    reviews,
    sold,
    description,
    info,
    qna,
  } = product;

  const discountedPrice = discount
    ? Math.round(price - (price * discount) / 100)
    : price;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Image */}
        <div className="relative h-[380px] rounded-2xl overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            priority
          />
          {discount > 0 && (
            <span className="badge badge-error absolute top-4 left-4 text-white">
              -{discount}%
            </span>
          )}
        </div>

        {/* Info */}
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-sm text-gray-500 mt-1">{bangla}</p>

          {/* Rating */}
          <div className="flex items-center gap-2 mt-3">
            <FaStar className="text-warning" />
            <span className="font-medium">{ratings}</span>
            <span className="text-gray-400">({reviews} reviews)</span>
            <span className="text-gray-400">• {sold} sold</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3 mt-4">
            <span className="text-3xl font-bold text-primary">
              ৳{discountedPrice}
            </span>
            {discount > 0 && (
              <span className="text-lg line-through text-gray-400">
                ৳{price}
              </span>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-6">
            <button className="btn btn-primary flex-1">Add to Cart</button>
            <button className="btn btn-outline flex-1">Buy Now</button>
          </div>

          {/* Features */}
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Why you’ll love it</h3>
            <ul className="list-disc list-inside space-y-1 text-sm">
              {info.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-3">Description</h2>
        <p className="text-gray-700 whitespace-pre-line leading-relaxed">
          {description}
        </p>
      </div>

      {/* Q&A */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Q & A</h2>
        <div className="space-y-3">
          {qna.map((item, index) => (
            <div key={index} className="collapse collapse-arrow bg-base-200">
              <input type="checkbox" />
              <div className="collapse-title font-medium">{item.question}</div>
              <div className="collapse-content">
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
