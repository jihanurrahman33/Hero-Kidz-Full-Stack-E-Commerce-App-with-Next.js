const ProductsLoading = () => {
  return (
    <div>
      <div className="h-10 w-48 bg-base-300 rounded-lg animate-pulse mx-auto mb-6" />

      {/* Search skeleton */}
      <div className="mb-8">
        <div className="h-11 bg-base-300 rounded-xl animate-pulse mb-3" />
        <div className="flex gap-3">
          <div className="h-8 w-32 bg-base-300 rounded-lg animate-pulse" />
          <div className="h-8 w-40 bg-base-300 rounded-lg animate-pulse" />
          <div className="h-8 w-36 bg-base-300 rounded-lg animate-pulse" />
        </div>
      </div>

      {/* Grid skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="bg-base-100 rounded-2xl shadow-sm overflow-hidden">
            <div className="aspect-square bg-base-300 animate-pulse" />
            <div className="p-4 space-y-2">
              <div className="h-4 bg-base-300 rounded animate-pulse w-3/4" />
              <div className="h-3 bg-base-300 rounded animate-pulse w-1/2" />
              <div className="h-5 bg-base-300 rounded animate-pulse w-1/3" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsLoading;
