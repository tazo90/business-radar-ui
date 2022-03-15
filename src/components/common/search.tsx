import { useRef } from "react";
import { SearchIcon, XIcon } from "@heroicons/react/outline";

export function Search({
  onSearch,
  placeholder,
  className = "",
  bgColor = "bg-white",
}) {
  const inputRef = useRef<HTMLInputElement>();

  function onClear() {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  return (
    <div className={`relative flex flex-row items-center ${className}`}>
      <button
        className={`flex items-center justify-center h-10 w-10 text-gray-500 rounded-l-lg ${bgColor}`}
      >
        <SearchIcon className="h-4 w-4" aria-hidden="true" />
      </button>
      <input
        ref={inputRef}
        type="text"
        className={`w-full border border-transparent focus:border-transparent focus:ring-0 text-sm h-10 flex items-center rounded-lg rounded-l-none pl-0 pr-2 ${bgColor}`}
        placeholder={placeholder}
        onChange={onSearch}
      />
      <XIcon
        className="absolute top-2.5 right-2.5 w-5 h-5 text-gray-500"
        aria-hidden="true"
        onClick={onClear}
      />
    </div>
  );
}
