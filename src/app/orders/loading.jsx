const OrdersLoading = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="h-7 w-40 bg-base-300 rounded-lg animate-pulse" />
          <div className="h-4 w-24 bg-base-300 rounded animate-pulse mt-2" />
        </div>
        <div className="h-8 w-24 bg-base-300 rounded-lg animate-pulse" />
      </div>

      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl bg-base-100 shadow-sm p-4 flex items-center gap-4"
          >
            <div className="flex -space-x-3">
              <div className="w-10 h-10 rounded-lg bg-base-300 animate-pulse" />
              <div className="w-10 h-10 rounded-lg bg-base-300 animate-pulse" />
            </div>
            <div className="flex-1 space-y-2">
              <div className="h-4 w-32 bg-base-300 rounded animate-pulse" />
              <div className="h-3 w-48 bg-base-300 rounded animate-pulse" />
            </div>
            <div className="h-5 w-16 bg-base-300 rounded animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersLoading;
