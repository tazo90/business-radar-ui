import { useState } from "react";
import { GlobeAltIcon, ChevronDownIcon } from "@heroicons/react/outline";

import { useCountriesQuery } from "../../../api/customer/get-all-countries";
import { Filter } from "../../common/filter";
import countries from "../../../constants/countries";

export function CountryFilter() {
  const [isFilterOpen, setFilterOpen] = useState(false);

  const { data, isLoading, error }: any = useCountriesQuery({});

  function getIcon(itemId: string) {
    const filtered = countries.filter((country) => country.value === itemId);
    if (filtered.length > 0) {
      return filtered[0].img;
    }
    return "";
  }

  return (
    <>
      <button
        className="border border-gray-300 h-10 rounded-lg text-gray-600 bg-white hover:bg-gray-100 font-medium text-sm px-2 py-1 text-center inline-flex items-center"
        type="button"
        onClick={() => setFilterOpen(true)}
      >
        <GlobeAltIcon className="h-6 w-6" aria-hidden="true" />
        <span className="px-2">Countries</span>
        <ChevronDownIcon className="h-4 w-4" aria-hidden="true" />
      </button>
      {isFilterOpen && (
        <Filter
          title="Countries"
          searchPlaceholder="Search a country"
          items={data}
          getIcon={getIcon}
          iconSize={6}
          isLoading={isLoading}
          onClose={() => setFilterOpen(false)}
        />
      )}
    </>
  );
}
