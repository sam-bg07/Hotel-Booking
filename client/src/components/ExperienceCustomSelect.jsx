import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const ExperienceCustomSelect = ({
  value,
  onChange,
  placeholder,
  children,
  className,
  error,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState("");

  useEffect(() => {
    if (value) {
      const option = React.Children.toArray(children).find(
        (child) => child.props.value === value
      );
      if (option) {
        setSelectedLabel(option.props.children);
      }
    } else {
      setSelectedLabel("");
    }
  }, [value, children]);

  const handleSelect = (optionValue, optionLabel) => {
    onChange(optionValue);
    setSelectedLabel(optionLabel);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full rounded-lg border px-3 py-2 text-left focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-200 ${
          error ? "border-red-500" : "border-gray-200"
        } ${className}`}
      >
        <span className={selectedLabel ? "text-gray-900" : "text-gray-500"}>
          {selectedLabel || placeholder}
        </span>
        <ChevronDown
          className={`absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
          {React.Children.map(children, (child) => (
            <button
              key={child.props.value}
              type="button"
              onClick={() =>
                handleSelect(child.props.value, child.props.children)
              }
              className="w-full px-3 py-2 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none first:rounded-t-lg last:rounded-b-lg cursor-pointer"
            >
              {child.props.children}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExperienceCustomSelect;
