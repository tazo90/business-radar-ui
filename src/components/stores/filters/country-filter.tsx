import { useState } from "react";

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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
          />
        </svg>
        <span className="px-2">Countries</span>
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
          title="Countries"
          searchPlaceholder="Search a country"
          items={data}
          getIcon={getIcon}
          iconSize={24}
          isLoading={isLoading}
          onClose={() => setFilterOpen(false)}
        />
      )}
    </>
  );
}
