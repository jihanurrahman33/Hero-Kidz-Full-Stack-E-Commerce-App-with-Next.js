const ProfileLoading = () => {
  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      {/* Hero */}
      <div className="bg-base-300/40 rounded-3xl p-8 pb-20 mb-16 animate-pulse relative">
        <div className="h-7 w-32 bg-base-300 rounded-lg mx-auto" />
        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
          <div className="w-24 h-24 rounded-full bg-base-300 ring-4 ring-base-100" />
        </div>
      </div>

      {/* Name / Email */}
      <div className="text-center mb-8 space-y-2">
        <div className="h-6 w-40 bg-base-300 rounded-lg animate-pulse mx-auto" />
        <div className="h-4 w-56 bg-base-300 rounded animate-pulse mx-auto" />
        <div className="h-5 w-16 bg-base-300 rounded-full animate-pulse mx-auto" />
      </div>

      {/* Info cards */}
      <div className="h-4 w-40 bg-base-300 rounded animate-pulse mb-3" />
      <div className="space-y-3 mb-8">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 p-4 bg-base-200/50 rounded-2xl">
            <div className="w-10 h-10 rounded-xl bg-base-300 animate-pulse" />
            <div className="space-y-1.5 flex-1">
              <div className="h-3 w-20 bg-base-300 rounded animate-pulse" />
              <div className="h-4 w-40 bg-base-300 rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>

      {/* Quick links */}
      <div className="h-4 w-28 bg-base-300 rounded animate-pulse mb-3" />
      <div className="grid grid-cols-2 gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 p-4 bg-base-200/50 rounded-2xl">
            <div className="w-10 h-10 rounded-xl bg-base-300 animate-pulse" />
            <div className="space-y-1.5">
              <div className="h-4 w-20 bg-base-300 rounded animate-pulse" />
              <div className="h-3 w-16 bg-base-300 rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileLoading;
