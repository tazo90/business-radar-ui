import { useState } from "react";
import { HomeIcon, ChevronDownIcon } from "@heroicons/react/outline";

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
        className="mx-3 border border-gray-300 h-10 rounded-lg text-gray-600 bg-white hover:bg-gray-100 font-medium text-sm px-2 py-1 text-center inline-flex items-center"
        type="button"
        onClick={() => setFilterOpen(true)}
      >
        <HomeIcon className="h-5 w-5" aria-hidden="true" />
        <span className="px-2">Brands</span>
        <span className="flex items-center justify-center w-5 h-5 rounded-xl bg-pink-500 text-white text-xs mr-1">
          3
        </span>
        <ChevronDownIcon className="h-4 w-4" aria-hidden="true" />
      </button>
      {isFilterOpen && (
        <Filter
          title="Brands"
          searchPlaceholder="Search a brand"
          items={data}
          getIcon={getIcon}
          isLoading={isLoading}
          onClose={() => setFilterOpen(false)}
        />
      )}
    </>
  );
}
