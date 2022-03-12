import { useState } from "react";
import { AdjustmentsIcon, ChevronDownIcon } from "@heroicons/react/outline";

import { Filter } from "../../common/filter";

export function MoreFilter() {
  const [isFilterOpen, setFilterOpen] = useState(false);

  return (
    <>
      <button
        className="border border-gray-300 h-10 rounded-lg text-gray-600 bg-white hover:bg-gray-100 font-medium text-sm px-2 py-1 text-center inline-flex items-center"
        type="button"
        onClick={() => setFilterOpen(true)}
      >
        <AdjustmentsIcon className="h-5 w-5" aria-hidden="true" />
        <span className="px-2">More</span>
        <span className="flex items-center justify-center w-5 h-5 rounded-xl bg-pink-500 text-white text-xs mr-1">
          3
        </span>
        <ChevronDownIcon className="h-4 w-4" aria-hidden="true" />
      </button>
      <Filter
        title="More filters"
        searchPlaceholder="Search a brand"
        items={[]}
        isOpen={isFilterOpen}
        onClose={() => setFilterOpen(false)}
      />
    </>
  );
}
