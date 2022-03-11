import { SearchIcon } from "@heroicons/react/outline";

export function Search({ onSearch, placeholder, bgColor = "bg-white" }) {
  return (
    <div className="flex flex-row items-center">
      <button
        className={`flex items-center justify-center h-10 w-10 text-gray-500 rounded-l-lg ${bgColor}`}
      >
        <SearchIcon className="h-4 w-4" aria-hidden="true" />
      </button>
      <input
        type="text"
        className={`w-full border border-transparent focus:border-transparent focus:ring-0 text-sm h-10 flex items-center rounded-lg rounded-l-none pl-0 pr-2 ${bgColor}`}
        placeholder={placeholder}
        onChange={onSearch}
      />
    </div>
  );
}
