import { X } from "lucide-react";
import { useEffect } from "react";

const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2">
      <div
        className={`rounded-lg p-4 shadow-lg max-w-md ${
          type === "success"
            ? "bg-green-50 border border-green-200"
            : "bg-red-50 border border-red-200"
        }`}
      >
        <div className="flex items-start">
          <div className="flex-1">
            <h3
              className={`text-sm font-medium ${
                type === "success" ? "text-green-800" : "text-red-800"
              }`}
            >
              {type === "success" ? "Success!" : "Error"}
            </h3>
            <p
              className={`mt-1 text-sm ${
                type === "success" ? "text-green-700" : "text-red-700"
              }`}
            >
              {message}
            </p>
          </div>
          <button
            onClick={onClose}
            className={`ml-4 inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              type === "success"
                ? "text-green-500 hover:bg-green-100 focus:ring-green-600"
                : "text-red-500 hover:bg-red-100 focus:ring-red-600"
            }`}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Toast;
