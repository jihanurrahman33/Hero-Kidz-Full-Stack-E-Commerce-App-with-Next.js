const TableLoading = () => {
  return (
    <div>
      <div className="h-7 w-44 bg-base-300 rounded-lg animate-pulse mb-6" />

      <div className="bg-base-100 rounded-2xl shadow-sm overflow-hidden">
        {/* Table header */}
        <div className="flex gap-4 px-5 py-3 bg-base-200/50">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="h-3 bg-base-300 rounded animate-pulse"
              style={{ width: `${60 + Math.random() * 60}px` }}
            />
          ))}
        </div>

        {/* Table rows */}
        <div className="divide-y divide-base-200">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 px-5 py-3">
              <div className="w-10 h-10 rounded-lg bg-base-300 animate-pulse shrink-0" />
              <div className="flex-1 space-y-1.5">
                <div className="h-4 w-36 bg-base-300 rounded animate-pulse" />
                <div className="h-3 w-24 bg-base-300 rounded animate-pulse" />
              </div>
              <div className="h-4 w-14 bg-base-300 rounded animate-pulse" />
              <div className="h-7 w-24 bg-base-300 rounded-lg animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TableLoading;
