import Skeleton from "@/components/ui/Skeleton";

const ProductsLoading = () => {
  return (
    <div>
      <Skeleton className="h-10 w-48 mx-auto mb-6" />

      {/* Search skeleton */}
      <div className="mb-8">
        <Skeleton className="h-11 w-full mb-3" />
        <div className="flex gap-3">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-8 w-36" />
        </div>
      </div>

      {/* Grid skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="bg-base-100 rounded-2xl shadow-sm overflow-hidden border border-base-200/50">
            <Skeleton className="aspect-square w-full rounded-none" />
            <div className="p-4 space-y-3">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
              <Skeleton className="h-5 w-1/3 mt-2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsLoading;
