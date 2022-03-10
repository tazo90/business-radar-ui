import { useState } from "react";

import { icons } from "../../../constants";
import { useBrandsQuery } from "../../../api/customer/get-all-brands";
import { Filter } from "../../common/filter";

export function BrandFilter() {
  const [isFilterOpen, setFilterOpen] = useState(false);

  const { data, isLoading, error }: any = useBrandsQuery({});

  function getIcon(itemId) {
    return icons.amrest.brands[itemId];
  }

  return (
    <>
      <button
        className="border border-gray-300 h-10 rounded-lg text-gray-600 bg-white hover:bg-gray-100 font-medium text-sm px-2 py-1 text-center inline-flex items-center"
        type="button"
        onClick={() => setFilterOpen(true)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
        <span className="px-2">Brands</span>
        <span className="flex items-center justify-center w-5 h-5 rounded-xl bg-pink-500 text-white text-xs mr-1">
          3
        </span>
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>
      {isFilterOpen && (
        <Filter
          title="Brands"
          searchPlaceholder="Search a brand"
          items={data}
          getIcon={getIcon}
          iconSize={30}
          isLoading={isLoading}
          onClose={() => setFilterOpen(false)}
        />
      )}
    </>
  );
}
