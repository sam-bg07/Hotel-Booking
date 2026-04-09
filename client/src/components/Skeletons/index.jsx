export const HomeSkeleton = () => (
  <div className="w-full min-h-screen animate-pulse space-y-20 pb-20">
    {/* Hero Skeleton */}
    <div className="w-full h-screen bg-gray-200 dark:bg-zinc-800 flex flex-col justify-center px-6 md:px-16 lg:px-24">
      <div className="w-64 h-8 bg-gray-300 dark:bg-zinc-700 rounded-2xl mb-6"></div>
      <div className="w-full max-w-2xl h-16 bg-gray-300 dark:bg-zinc-700 rounded-xl mb-6"></div>
      <div className="w-full max-w-md h-6 bg-gray-300 dark:bg-zinc-700 rounded-md mb-10"></div>
      <div className="w-full max-w-4xl h-20 bg-white dark:bg-zinc-900 rounded-lg shadow-lg"></div>
    </div>

    {/* Featured Hotels Skeleton */}
    <div className="flex flex-col items-center px-6 md:px-16 lg:px-24 w-full">
      <div className="w-1/2 h-12 bg-gray-200 dark:bg-zinc-800 rounded-lg mb-6"></div>
      <div className="w-2/3 h-6 bg-gray-100 dark:bg-zinc-900 rounded-md mb-12"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex flex-col gap-4">
            <div className="w-full aspect-[4/5] bg-gray-200 dark:bg-zinc-800 rounded-2xl"></div>
            <div className="w-3/4 h-6 bg-gray-200 dark:bg-zinc-800 rounded-md"></div>
            <div className="w-1/2 h-4 bg-gray-100 dark:bg-zinc-900 rounded-md"></div>
          </div>
        ))}
      </div>
    </div>

    {/* Exclusive Offer Skeleton */}
    <div className="bg-gray-50 dark:bg-zinc-900/50 py-20 w-full flex flex-col items-center px-6 md:px-16 lg:px-24">
      <div className="w-1/3 h-12 bg-gray-200 dark:bg-zinc-800 rounded-lg mb-12"></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="aspect-video w-full bg-gray-200 dark:bg-zinc-800 rounded-xl"
          ></div>
        ))}
      </div>
    </div>

    {/* Guest Words Skeleton */}
    <div className="px-6 md:px-16 lg:px-24 w-full flex flex-col items-center">
      <div className="w-1/2 h-12 bg-gray-200 dark:bg-zinc-800 rounded-lg mb-12"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="h-48 bg-gray-100 dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800"
          ></div>
        ))}
      </div>
    </div>

    {/* Stay Updated Skeleton */}
    <div className="px-6 md:px-16 lg:px-24 w-full">
      <div className="w-full h-80 bg-blue-50 dark:bg-zinc-900 rounded-3xl"></div>
    </div>
  </div>
);

export const HotelSkeleton = () => (
  <div className="mt-20 md:mt-40 px-6 md:px-16 lg:px-20 xl:px-28 flex max-lg:flex-col-reverse animate-pulse">
    {/* Main Content Area */}
    <div className="flex-1">
      <div className="flex flex-col items-start text-left">
        {/* Title & Description */}
        <div className="h-10 w-64 bg-gray-200 dark:bg-zinc-800 rounded-lg mb-5"></div>
        <div className="h-4 w-full max-w-180 bg-gray-100 dark:bg-zinc-900 rounded-md mb-2"></div>
        <div className="h-4 w-3/4 max-w-180 bg-gray-100 dark:bg-zinc-900 rounded-md mb-5"></div>
        {/* Results Count */}
        <div className="h-4 w-48 bg-gray-100 dark:bg-zinc-900 rounded-md mb-2"></div>
      </div>

      {/* Room Cards List */}
      <div className="space-y-10 mt-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex flex-col bg-white dark:bg-zinc-900 p-4 rounded-xl shadow-md border border-gray-100 dark:border-zinc-800">
            <div className="flex flex-col md:flex-row gap-5">
              {/* Image Skeleton */}
              <div className="w-full md:w-[50%] h-65 rounded-xl bg-gray-200 dark:bg-zinc-800"></div>
              
              {/* Content Skeleton */}
              <div className="flex flex-col justify-between w-full md:flex-1 py-1">
                <div className="space-y-3">
                  <div className="h-4 w-24 bg-gray-100 dark:bg-zinc-900 rounded"></div>
                  <div className="h-8 w-3/4 bg-gray-200 dark:bg-zinc-800 rounded"></div>
                  <div className="h-6 w-32 bg-blue-50 dark:bg-zinc-950 rounded"></div>
                  
                  {/* Stars */}
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, j) => (
                      <div key={j} className="w-5 h-5 bg-gray-100 dark:bg-zinc-900 rounded-full"></div>
                    ))}
                  </div>

                  {/* Location */}
                  <div className="h-4 w-2/3 bg-gray-100 dark:bg-zinc-900 rounded mt-2"></div>

                  {/* Amenities */}
                  <div className="flex gap-2 flex-wrap">
                    {[...Array(3)].map((_, k) => (
                      <div key={k} className="h-7 w-24 bg-gray-100 dark:bg-zinc-900 rounded"></div>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div className="h-6 w-32 bg-gray-200 dark:bg-zinc-800 rounded mt-4"></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Skeleton */}
      <div className="flex items-center justify-center gap-2 mt-12 mb-8">
        <div className="w-10 h-10 bg-gray-100 dark:bg-zinc-900 rounded-md"></div>
        <div className="w-10 h-10 bg-gray-200 dark:bg-zinc-800 rounded-md"></div>
        <div className="w-10 h-10 bg-gray-100 dark:bg-zinc-900 rounded-md"></div>
        <div className="w-10 h-10 bg-gray-100 dark:bg-zinc-900 rounded-md"></div>
      </div>
    </div>

    {/* Sidebar Filter Area */}
    <div className="border-0 lg:w-80 lg:mx-15 lg:mb-20">
      <div className="mt-10 mx-3 my-1.5 border-2 border-gray-200 dark:border-zinc-800 rounded overflow-hidden">
        {/* Filter Header */}
        <div className="h-14 bg-gray-50 dark:bg-zinc-950 border-b-2 border-gray-200 dark:border-zinc-800 flex items-center justify-between px-4">
          <div className="h-5 w-20 bg-gray-200 dark:bg-zinc-800 rounded"></div>
          <div className="h-4 w-12 bg-gray-200 dark:bg-zinc-800 rounded"></div>
        </div>
        
        {/* Filter Content */}
        <div className="p-5 space-y-8">
          {/* Section 1 */}
          <div className="space-y-3">
            <div className="h-5 w-32 bg-gray-200 dark:bg-zinc-800 rounded"></div>
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="h-4 w-4 bg-gray-200 dark:bg-zinc-800 rounded"></div>
                <div className="h-4 w-3/4 bg-gray-100 dark:bg-zinc-900 rounded"></div>
              </div>
            ))}
          </div>

          {/* Section 2 */}
          <div className="space-y-3">
            <div className="h-5 w-32 bg-gray-200 dark:bg-zinc-800 rounded"></div>
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="h-4 w-4 bg-gray-200 dark:bg-zinc-800 rounded"></div>
                <div className="h-4 w-3/4 bg-gray-100 dark:bg-zinc-900 rounded"></div>
              </div>
            ))}
          </div>

          {/* Section 3 */}
          <div className="space-y-3">
            <div className="h-5 w-32 bg-gray-200 dark:bg-zinc-800 rounded"></div>
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="h-4 w-4 bg-gray-200 dark:bg-zinc-800 rounded-full"></div>
                <div className="h-4 w-3/4 bg-gray-100 dark:bg-zinc-900 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const RoomDetailsSkeleton = () => (
  <div className="w-full min-h-screen bg-white dark:bg-zinc-950 pb-20 pt-24">
    <div className="max-w-7xl mx-auto p-4 md:p-8 animate-pulse space-y-10">
      {/* Header */}
      <div className="space-y-4">
        <div className="w-2/3 h-12 bg-gray-200 dark:bg-zinc-800 rounded-md"></div>
        <div className="flex gap-4">
          <div className="w-32 h-4 bg-gray-100 dark:bg-zinc-900 rounded"></div>
          <div className="w-32 h-4 bg-gray-100 dark:bg-zinc-900 rounded"></div>
        </div>
      </div>

      {/* Images Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[60vh]">
        <div className="md:col-span-2 h-full bg-gray-200 dark:bg-zinc-800 rounded-2xl"></div>
        <div className="hidden md:grid grid-rows-2 gap-4 h-full md:col-span-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-100 dark:bg-zinc-900 rounded-2xl"></div>
            <div className="bg-gray-100 dark:bg-zinc-900 rounded-2xl"></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-100 dark:bg-zinc-900 rounded-2xl"></div>
            <div className="bg-gray-100 dark:bg-zinc-900 rounded-2xl"></div>
          </div>
        </div>
      </div>

      {/* Details Bottom */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <div className="flex justify-between items-center border-b pb-8 border-gray-100 dark:border-zinc-800">
            <div className="space-y-2">
              <div className="w-48 h-8 bg-gray-200 dark:bg-zinc-800 rounded"></div>
              <div className="w-32 h-4 bg-gray-100 dark:bg-zinc-900 rounded"></div>
            </div>
            <div className="w-16 h-16 bg-gray-100 dark:bg-zinc-900 rounded-full"></div>
          </div>
          <div className="space-y-4">
            <div className="w-full h-4 bg-gray-100 dark:bg-zinc-900 rounded"></div>
            <div className="w-full h-4 bg-gray-100 dark:bg-zinc-900 rounded"></div>
            <div className="w-3/4 h-4 bg-gray-100 dark:bg-zinc-900 rounded"></div>
          </div>
          <div className="grid grid-cols-2 gap-6 pt-8">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="w-full h-24 bg-gray-50 dark:bg-zinc-900 rounded-xl"
              ></div>
            ))}
          </div>
        </div>
        <div className="w-full">
          <div className="w-full h-[500px] border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-6">
            <div className="w-full h-12 bg-gray-200 dark:bg-zinc-800 rounded-md mb-8"></div>
            <div className="space-y-4">
              <div className="w-full h-16 border border-gray-100 dark:border-zinc-800 rounded-xl bg-gray-50 dark:bg-zinc-950"></div>
              <div className="w-full h-16 border border-gray-100 dark:border-zinc-800 rounded-xl bg-gray-50 dark:bg-zinc-950"></div>
            </div>
            <div className="mt-10 w-full h-14 bg-gray-900 dark:bg-zinc-100 rounded-xl"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const ExperienceSkeleton = () => (
  <div className="w-full min-h-screen animate-pulse bg-white dark:bg-zinc-950 space-y-20 pb-20">
    {/* Experience Hero */}
    <div className="w-full h-[80vh] bg-gray-200 dark:bg-zinc-800 flex flex-col items-center justify-center space-y-6">
      <div className="w-1/3 h-16 bg-gray-300 dark:bg-zinc-700 rounded-xl"></div>
      <div className="w-1/4 h-12 bg-gray-900 dark:bg-zinc-100 rounded-lg"></div>
    </div>

    {/* Image Gallery */}
    <div className="px-6 md:px-16 lg:px-24 grid grid-cols-2 md:grid-cols-4 gap-4 aspect-video">
      <div className="col-span-2 row-span-2 bg-gray-200 dark:bg-zinc-800 rounded-2xl"></div>
      <div className="bg-gray-100 dark:bg-zinc-900 rounded-2xl"></div>
      <div className="bg-gray-100 dark:bg-zinc-900 rounded-2xl"></div>
      <div className="bg-gray-100 dark:bg-zinc-900 rounded-2xl"></div>
      <div className="bg-gray-100 dark:bg-zinc-900 rounded-2xl"></div>
    </div>

    {/* Experience Cards */}
    <div className="px-6 md:px-16 lg:px-24 space-y-12">
      <div className="flex flex-col items-center gap-4">
        <div className="w-64 h-12 bg-gray-200 dark:bg-zinc-800 rounded-lg text-center"></div>
        <div className="w-full max-w-2xl h-12 bg-gray-100 dark:bg-zinc-900 rounded-md"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex flex-col gap-4">
            <div className="w-full aspect-square bg-gray-200 dark:bg-zinc-800 rounded-2xl"></div>
            <div className="w-3/4 h-8 bg-gray-200 dark:bg-zinc-800 rounded-md"></div>
            <div className="w-1/2 h-6 bg-gray-100 dark:bg-zinc-900 rounded-md"></div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export const AboutSkeleton = () => (
  <div className="w-full min-h-screen animate-pulse bg-white dark:bg-zinc-950 space-y-20 pb-20">
    {/* Our Story / Hero */}
    <div className="w-full h-screen bg-gray-200 dark:bg-zinc-800"></div>

    {/* Content Sections */}
    {[...Array(3)].map((_, i) => (
      <div
        key={i}
        className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
      >
        <div className={`space-y-6 ${i % 2 === 0 ? "" : "md:order-last"}`}>
          <div className="w-48 h-10 bg-gray-200 dark:bg-zinc-800 rounded-lg"></div>
          <div className="w-full h-32 bg-gray-100 dark:bg-zinc-900 rounded-xl"></div>
        </div>
        <div className="w-full aspect-square bg-gray-200 dark:bg-zinc-800 rounded-2xl shadow-xl"></div>
      </div>
    ))}

    {/* Team Grid */}
    <div className="max-w-7xl mx-auto px-6 space-y-12">
      <div className="w-64 h-12 bg-gray-200 dark:bg-zinc-800 rounded-lg mx-auto"></div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="space-y-4">
            <div className="w-full aspect-square bg-gray-200 dark:bg-zinc-800 rounded-full"></div>
            <div className="w-32 h-6 bg-gray-200 dark:bg-zinc-800 rounded-md mx-auto"></div>
            <div className="w-24 h-4 bg-gray-100 dark:bg-zinc-900 rounded-md mx-auto"></div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export const MyBookingSkeleton = () => (
  <div className="w-full min-h-screen bg-gray-50 dark:bg-zinc-950 pt-24 pb-20 animate-pulse">
    <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="w-64 h-12 bg-gray-200 dark:bg-zinc-800 rounded-lg"></div>
        <div className="w-48 h-10 bg-gray-200 dark:bg-zinc-800 rounded-md"></div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="w-full bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-800 p-6 flex flex-col md:flex-row gap-8"
          >
            <div className="w-full md:w-64 h-48 bg-gray-200 dark:bg-zinc-800 rounded-xl flex-shrink-0"></div>
            <div className="flex-grow space-y-6">
              <div className="flex justify-between items-start">
                <div className="space-y-3">
                  <div className="w-72 h-8 bg-gray-200 dark:bg-zinc-800 rounded-md"></div>
                  <div className="w-48 h-4 bg-gray-100 dark:bg-zinc-900 rounded-md"></div>
                </div>
                <div className="w-24 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-full"></div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[...Array(4)].map((_, j) => (
                  <div
                    key={j}
                    className="w-full h-12 bg-gray-50 dark:bg-zinc-950 rounded-lg"
                  ></div>
                ))}
              </div>
              <div className="flex justify-end gap-4 border-t pt-6 border-gray-100 dark:border-zinc-800">
                <div className="w-32 h-12 bg-gray-100 dark:bg-zinc-900 rounded-xl"></div>
                <div className="w-32 h-12 bg-gray-900 dark:bg-zinc-100 rounded-xl"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export const DashboardSkeleton = () => (
  <div className="p-4 md:p-8 animate-pulse w-full space-y-10 bg-white dark:bg-zinc-950 min-h-screen">
    <div className="flex justify-between items-center">
      <div className="w-64 h-10 bg-gray-200 dark:bg-zinc-800 rounded-lg"></div>
      <div className="w-12 h-12 bg-gray-100 dark:bg-zinc-900 rounded-full"></div>
    </div>

    {/* Stats row */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="h-32 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-2xl p-6 space-y-4 shadow-sm"
        >
          <div className="w-1/3 h-4 bg-gray-100 dark:bg-zinc-900 rounded"></div>
          <div className="w-2/3 h-8 bg-gray-200 dark:bg-zinc-800 rounded"></div>
        </div>
      ))}
    </div>

    {/* Big Section Grid */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 h-[500px] bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-2xl shadow-sm"></div>
      <div className="h-[500px] bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-2xl shadow-sm"></div>
    </div>

    {/* Recent Activity Table */}
    <div className="w-full space-y-4">
      <div className="w-48 h-8 bg-gray-200 dark:bg-zinc-800 rounded-lg"></div>
      <div className="w-full bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-2xl overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="w-full h-16 border-b border-gray-50 dark:border-zinc-800 last:border-0 bg-gray-50/50 dark:bg-zinc-950/50"
          ></div>
        ))}
      </div>
    </div>
  </div>
);

export const ListSkeleton = () => (
  <div className="p-4 md:p-8 animate-pulse w-full space-y-8 bg-white dark:bg-zinc-950 min-h-screen">
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8">
      <div className="space-y-2">
        <div className="w-64 h-10 bg-gray-200 dark:bg-zinc-800 rounded-lg"></div>
        <div className="w-48 h-4 bg-gray-100 dark:bg-zinc-900 rounded"></div>
      </div>
      <div className="w-40 h-12 bg-gray-900 dark:bg-zinc-100 rounded-xl"></div>
    </div>

    {/* Table Layout */}
    <div className="w-full bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-2xl shadow-sm overflow-hidden">
      {/* Table Header */}
      <div className="w-full h-14 bg-gray-50 dark:bg-zinc-950 border-b border-gray-100 dark:border-zinc-800"></div>

      {/* Table rows */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-6 p-4 border-b border-gray-50 dark:border-zinc-800 last:border-0"
        >
          <div className="w-12 h-12 bg-gray-200 dark:bg-zinc-800 rounded-lg flex-shrink-0"></div>
          <div className="w-1/4 h-5 bg-gray-100 dark:bg-zinc-900 rounded"></div>
          <div className="w-1/6 h-5 bg-gray-100 dark:bg-zinc-900 rounded"></div>
          <div className="w-1/6 h-5 bg-gray-100 dark:bg-zinc-900 rounded"></div>
          <div className="ml-auto flex gap-3">
            <div className="w-10 h-10 bg-gray-100 dark:bg-zinc-900 rounded-lg"></div>
            <div className="w-10 h-10 bg-gray-200 dark:bg-zinc-800 rounded-lg"></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const NavbarSkeleton = () => (
  <div className="w-full h-20 fixed top-0 z-50 animate-pulse bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-gray-100 dark:border-zinc-800 px-6 md:px-16 flex items-center justify-between">
    <div className="w-32 h-10 bg-gray-200 dark:bg-zinc-800 rounded-lg"></div>
    <div className="hidden md:flex gap-8">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="w-20 h-4 bg-gray-100 dark:bg-zinc-900 rounded"
        ></div>
      ))}
    </div>
    <div className="w-10 h-10 bg-gray-200 dark:bg-zinc-800 rounded-full"></div>
  </div>
);

export const DefaultSkeleton = () => (
  <div className="w-full min-h-screen p-4 md:p-8 flex flex-col gap-10 animate-pulse bg-white dark:bg-zinc-950 pt-24">
    <div className="w-full h-64 md:h-80 bg-gray-200 dark:bg-zinc-800 rounded-3xl shadow-sm"></div>
    <div className="max-w-7xl mx-auto w-full space-y-12">
      <div className="w-64 h-10 bg-gray-200 dark:bg-zinc-800 rounded-lg"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="flex flex-col gap-5">
            <div className="w-full aspect-video bg-gray-100 dark:bg-zinc-900 rounded-2xl"></div>
            <div className="space-y-3">
              <div className="w-3/4 h-5 bg-gray-200 dark:bg-zinc-800 rounded-md"></div>
              <div className="w-1/2 h-4 bg-gray-100 dark:bg-zinc-900 rounded-md"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
