const DashboardLoading = () => {
  return (
    <div>
      <div className="h-7 w-52 bg-base-300 rounded-lg animate-pulse mb-6" />

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-base-100 rounded-2xl p-5 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-base-300 animate-pulse mb-3" />
            <div className="h-7 w-24 bg-base-300 rounded-lg animate-pulse" />
            <div className="h-3 w-20 bg-base-300 rounded animate-pulse mt-2" />
          </div>
        ))}
      </div>

      {/* Table skeleton */}
      <div className="bg-base-100 rounded-2xl shadow-sm p-5">
        <div className="h-5 w-32 bg-base-300 rounded animate-pulse mb-4" />
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="h-4 w-16 bg-base-300 rounded animate-pulse" />
              <div className="h-4 w-28 bg-base-300 rounded animate-pulse" />
              <div className="h-4 w-10 bg-base-300 rounded animate-pulse" />
              <div className="h-4 w-16 bg-base-300 rounded animate-pulse" />
              <div className="h-5 w-20 bg-base-300 rounded-full animate-pulse" />
              <div className="h-4 w-14 bg-base-300 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardLoading;
