const ProductDetailsLoading = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Image */}
        <div className="h-[380px] skeleton rounded-2xl"></div>

        {/* Info */}
        <div className="space-y-4">
          <div className="h-6 skeleton w-3/4"></div>
          <div className="h-4 skeleton w-1/2"></div>

          <div className="h-4 skeleton w-1/3"></div>

          <div className="h-8 skeleton w-1/2"></div>

          <div className="flex gap-3">
            <div className="h-10 skeleton w-1/2"></div>
            <div className="h-10 skeleton w-1/2"></div>
          </div>

          <div className="space-y-2 mt-4">
            <div className="h-4 skeleton w-full"></div>
            <div className="h-4 skeleton w-5/6"></div>
            <div className="h-4 skeleton w-4/6"></div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mt-10 space-y-3">
        <div className="h-5 skeleton w-1/4"></div>
        <div className="h-4 skeleton w-full"></div>
        <div className="h-4 skeleton w-5/6"></div>
        <div className="h-4 skeleton w-4/6"></div>
      </div>
    </div>
  );
};

export default ProductDetailsLoading;
