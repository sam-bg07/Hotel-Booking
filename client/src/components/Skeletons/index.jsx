export const HomeSkeleton = () => (
  <div className="w-full min-h-screen animate-pulse space-y-8 p-4">
    {/* Hero Section */}
    <div className="w-full h-[60vh] bg-gray-200 dark:bg-zinc-800 rounded-3xl"></div>
    {/* Features/Search bar */}
    <div className="max-w-6xl mx-auto h-24 bg-gray-200 dark:bg-zinc-800 rounded-xl -mt-16 relative z-10"></div>

    {/* Featured Cards Grid */}
    <div className="max-w-7xl mx-auto space-y-4 pt-8">
      <div className="w-48 h-8 bg-gray-200 dark:bg-zinc-800 rounded-md"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex flex-col gap-3">
            <div className="w-full h-64 bg-gray-200 dark:bg-zinc-800 rounded-2xl"></div>
            <div className="w-3/4 h-5 bg-gray-200 dark:bg-zinc-800 rounded-md"></div>
            <div className="w-1/2 h-4 bg-gray-200 dark:bg-zinc-800 rounded-md"></div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export const HotelSkeleton = () => (
  <div className="max-w-7xl mx-auto p-4 md:p-8 animate-pulse flex flex-col md:flex-row gap-8">
    {/* Sidebar Filter */}
    <div className="w-full md:w-1/4 flex flex-col gap-4">
      <div className="w-full h-10 bg-gray-200 dark:bg-zinc-800 rounded-md"></div>
      <div className="w-full h-48 bg-gray-200 dark:bg-zinc-800 rounded-md"></div>
    </div>

    {/* Main Content */}
    <div className="w-full md:w-3/4 flex flex-col gap-6">
      <div className="w-48 h-8 bg-gray-200 dark:bg-zinc-800 rounded-md"></div>
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="w-full h-48 bg-gray-200 dark:bg-zinc-800 rounded-2xl"
        ></div>
      ))}
    </div>
  </div>
);

export const RoomDetailsSkeleton = () => (
  <div className="max-w-7xl mx-auto p-4 md:p-8 animate-pulse space-y-8">
    {/* Header */}
    <div className="w-2/3 h-10 bg-gray-200 dark:bg-zinc-800 rounded-md"></div>

    {/* Images Grid */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[50vh]">
      <div className="md:col-span-2 h-full bg-gray-200 dark:bg-zinc-800 rounded-2xl"></div>
      <div className="hidden md:flex flex-col gap-4 h-full">
        <div className="h-1/2 bg-gray-200 dark:bg-zinc-800 rounded-2xl"></div>
        <div className="h-1/2 bg-gray-200 dark:bg-zinc-800 rounded-2xl"></div>
      </div>
    </div>

    {/* Details Bottom */}
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="w-full lg:w-2/3 space-y-4">
        <div className="w-full h-32 bg-gray-200 dark:bg-zinc-800 rounded-xl"></div>
        <div className="w-full h-64 bg-gray-200 dark:bg-zinc-800 rounded-xl"></div>
      </div>
      <div className="w-full lg:w-1/3">
        <div className="w-full h-80 bg-gray-200 dark:bg-zinc-800 rounded-2xl"></div>
      </div>
    </div>
  </div>
);

export const ExperienceSkeleton = () => (
  <div className="max-w-7xl mx-auto p-4 md:p-8 animate-pulse space-y-12">
    {/* Experience Hero */}
    <div className="w-full h-80 bg-gray-200 dark:bg-zinc-800 rounded-3xl"></div>
    {/* Experience slider */}
    <div className="flex gap-4 overflow-x-hidden">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="min-w-[300px] h-96 bg-gray-200 dark:bg-zinc-800 rounded-2xl"
        ></div>
      ))}
    </div>
  </div>
);

export const DashboardSkeleton = () => (
  <div className="p-4 md:p-8 animate-pulse w-full space-y-6">
    <div className="w-48 h-8 bg-gray-200 dark:bg-zinc-800 rounded-md"></div>

    {/* Stats row */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="h-32 bg-gray-200 dark:bg-zinc-800 rounded-xl"
        ></div>
      ))}
    </div>

    {/* Chart/Table Area */}
    <div className="w-full h-96 bg-gray-200 dark:bg-zinc-800 rounded-2xl mt-8"></div>
  </div>
);

export const ListSkeleton = () => (
  <div className="p-4 md:p-8 animate-pulse w-full space-y-4">
    <div className="flex justify-between items-center mb-6">
      <div className="w-48 h-8 bg-gray-200 dark:bg-zinc-800 rounded-md"></div>
      <div className="w-32 h-10 bg-gray-200 dark:bg-zinc-800 rounded-md"></div>
    </div>

    {/* Table rows */}
    {[...Array(6)].map((_, i) => (
      <div
        key={i}
        className="w-full h-16 bg-gray-200 dark:bg-zinc-800 rounded-xl"
      ></div>
    ))}
  </div>
);

export const DefaultSkeleton = () => (
  <div className="w-full min-h-screen p-4 md:p-8 flex flex-col gap-6 animate-pulse">
    <div className="w-full h-48 md:h-72 bg-gray-200 dark:bg-zinc-800 rounded-2xl"></div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="flex flex-col gap-3">
          <div className="w-full h-40 md:h-48 bg-gray-200 dark:bg-zinc-800 rounded-xl"></div>
          <div className="w-3/4 h-4 bg-gray-200 dark:bg-zinc-800 rounded-md"></div>
          <div className="w-1/2 h-3 bg-gray-200 dark:bg-zinc-800 rounded-md"></div>
        </div>
      ))}
    </div>
  </div>
);
