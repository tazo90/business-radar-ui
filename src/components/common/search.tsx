export function Search({ onSearch, placeholder, bgColor = "bg-white" }) {
  return (
    <div className="flex flex-row items-center">
      <button
        className={`flex items-center justify-center h-10 w-10 text-gray-500 rounded-l-lg ${bgColor}`}
      >
        <svg
          className="w-4 h-4 stroke-current"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
      </button>
      <input
        type="text"
        className={`w-full border border-transparent focus:border-transparent focus:ring-0 text-sm h-10 flex items-center rounded-lg rounded-l-none px-2 ${bgColor}`}
        placeholder={placeholder}
        onChange={onSearch}
      />
    </div>
  );
}
