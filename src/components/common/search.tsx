import { useRef } from "react";
import { SearchIcon } from "@heroicons/react/outline";

export function Search({ onSearch, placeholder }) {
  const inputRef = useRef<HTMLInputElement>();

  return (
    <div className="min-w-0 flex-1 md:px-0 xl:col-span-6">
      <div className="flex items-center md:pl-2 md:mx-auto lg:max-w-none lg:mx-0 xl:px-0">
        <div className="w-full">
          <label htmlFor="search" className="sr-only">
            Search
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
              <SearchIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </div>
            <input
              id="search"
              name="search"
              ref={inputRef}
              className="block w-full bg-white border border-gray-300 rounded-md py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:border-gray-400 focus:outline-none focus:text-gray-900 focus:ring-0 sm:text-sm"
              type="search"
              placeholder={placeholder}
              onChange={onSearch}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
