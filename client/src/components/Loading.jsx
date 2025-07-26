const Loading = ({
  type = "page", // page, section, button, card, table, spinner, dots, overlay
  size = "md", // sm, md, lg, xl
  color = "blue", // blue, red, green, gray, white
  message = "Loading...",
  showMessage = true,
  showSpinner = true,
  height = "h-64",
  count = 3,
  rows = 5,
  columns = 4,
  variant = "default", // default, minimal, fullscreen, hotel, list
  isVisible = true,
  children,
  isLoading = false,
  loadingText = "Loading...",
  className = "",
  disabled = false,
  ...props
}) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  };

  const colorClasses = {
    blue: "border-blue-500",
    red: "border-red-500",
    green: "border-green-500",
    gray: "border-gray-500",
    white: "border-white",
  };

  const dotColorClasses = {
    gray: "bg-gray-400",
    blue: "bg-blue-500",
    red: "bg-red-500",
    green: "bg-green-500",
    white: "bg-white",
  };

  // Spinner Component
  const Spinner = () => (
    <div className="flex items-center justify-center">
      <div
        className={`${sizeClasses[size]} ${colorClasses[color]} border-2 border-t-transparent rounded-full animate-spin`}
      ></div>
    </div>
  );

  // Dots Component
  const Dots = () => (
    <div className="flex items-center justify-center space-x-1">
      <div
        className={`w-2 h-2 ${dotColorClasses[color]} rounded-full animate-bounce`}
      ></div>
      <div
        className={`w-2 h-2 ${dotColorClasses[color]} rounded-full animate-bounce`}
        style={{ animationDelay: "0.1s" }}
      ></div>
      <div
        className={`w-2 h-2 ${dotColorClasses[color]} rounded-full animate-bounce`}
        style={{ animationDelay: "0.2s" }}
      ></div>
    </div>
  );

  // Card Skeleton
  const CardSkeleton = () => {
    if (variant === "hotel") {
      return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden animate-pulse">
          <div className="w-full h-48 bg-gray-200"></div>
          <div className="p-4 space-y-3">
            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="flex justify-between items-center">
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-6 bg-gray-200 rounded w-1/4"></div>
            </div>
          </div>
        </div>
      );
    }

    if (variant === "list") {
      return (
        <div className="bg-white rounded-lg shadow border border-gray-100 p-4 animate-pulse">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/4"></div>
            </div>
          </div>
        </div>
      );
    }

    // Default card skeleton
    return (
      <div className="bg-white rounded-lg shadow border border-gray-100 p-6 animate-pulse">
        <div className="space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/2"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
          </div>
          <div className="flex justify-between items-center pt-4">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          </div>
        </div>
      </div>
    );
  };

  // Render based on type
  switch (type) {
    case "spinner":
      return <Spinner />;

    case "dots":
      return <Dots />;

    case "overlay":
      if (!isVisible) return null;
      return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 flex flex-col items-center space-y-4 mx-4">
            <Spinner />
            {showMessage && (
              <p className="text-gray-700 font-medium">{message}</p>
            )}
          </div>
        </div>
      );

    case "button":
      return (
        <button
          className={`relative ${className} ${
            isLoading ? "cursor-not-allowed opacity-75" : ""
          }`}
          disabled={disabled || isLoading}
          {...props}
        >
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className={`${sizeClasses.sm} ${colorClasses.white} border-2 border-t-transparent rounded-full animate-spin`}
              ></div>
            </div>
          )}
          <span className={isLoading ? "invisible" : "visible"}>
            {isLoading ? loadingText : children}
          </span>
        </button>
      );

    case "section":
      return (
        <div
          className={`${height} flex flex-col items-center justify-center bg-gray-50 rounded-lg border border-gray-200`}
        >
          <Spinner />
          {showMessage && (
            <p className="mt-4 text-gray-600 text-sm">{message}</p>
          )}
        </div>
      );

    case "card":
      return (
        <div className="space-y-4">
          {Array.from({ length: count }).map((_, index) => (
            <div key={index}>
              <CardSkeleton />
            </div>
          ))}
        </div>
      );

    case "table":
      return (
        <div className="bg-white rounded-lg shadow border border-gray-100 overflow-hidden">
          {/* Table Header */}
          <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
            <div className={`grid grid-cols-${columns} gap-4`}>
              {Array.from({ length: columns }).map((_, index) => (
                <div
                  key={index}
                  className="h-4 bg-gray-200 rounded animate-pulse"
                ></div>
              ))}
            </div>
          </div>
          {/* Table Rows */}
          <div className="divide-y divide-gray-200">
            {Array.from({ length: rows }).map((_, rowIndex) => (
              <div key={rowIndex} className="px-6 py-4">
                <div className={`grid grid-cols-${columns} gap-4`}>
                  {Array.from({ length: columns }).map((_, colIndex) => (
                    <div
                      key={colIndex}
                      className="h-4 bg-gray-200 rounded animate-pulse"
                    ></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    case "page":
    default:
      if (variant === "minimal") {
        return (
          <div className="flex items-center justify-center py-8">
            {showSpinner && <Spinner />}
          </div>
        );
      }

      if (variant === "fullscreen") {
        return (
          <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-50">
            <div className="text-center flex items-center justify-center space-y-4">
              {showSpinner && <Spinner />}
              {showMessage && (
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {message}
                  </h2>
                  <p className="text-gray-500">
                    Please wait while we load your content
                  </p>
                </div>
              )}
            </div>
          </div>
        );
      }

      // Default page loading
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
          <div className="text-center space-y-6 px-4">
            {/* Logo or Brand */}
            <div className="mb-8">
              <div className="text-2xl font-bold text-gray-800">QuickStay</div>
            </div>

            {/* Loading Animation */}
            {showSpinner && (
              <div className="relative flex items-center justify-center">
                <div
                  className={`${sizeClasses.xl} ${colorClasses[color]} border-2 border-t-transparent rounded-full animate-spin`}
                ></div>
                {/* Pulsing circles around spinner */}
                <div className="absolute inset-0 rounded-full border-2 border-blue-200 animate-ping"></div>
                <div
                  className="absolute inset-2 rounded-full border-2 border-blue-100 animate-ping"
                  style={{ animationDelay: "0.5s" }}
                ></div>
              </div>
            )}

            {/* Loading Message */}
            {showMessage && (
              <div className="space-y-2">
                <h2 className="text-xl font-semibold text-gray-800">
                  {message}
                </h2>
                <p className="text-gray-500 max-w-sm mx-auto">
                  We're preparing everything for you. This won't take long.
                </p>
              </div>
            )}

            {/* Loading Progress Dots */}
            <Dots />
          </div>
        </div>
      );
  }
};

export default Loading;
