import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GlobeAltIcon, ChevronDownIcon } from "@heroicons/react/outline";

import { Filter } from "@components/common/filter";
import availableCountries from "@constants/countries";
import { setFilters } from "@slices/store.slice";

type CountryFilterProps = {
  countries?: any;
};

export function CountryFilter(props: CountryFilterProps) {
  const { countries } = props;
  const dispatch = useDispatch();
  const { filters } = useSelector((state: any) => state.store);

  const [isFilterOpen, setFilterOpen] = useState(false);

  function getIcon(itemId: string) {
    const filtered = availableCountries.filter(
      (country) => country.value === itemId
    );
    if (filtered.length > 0) {
      return filtered[0].img;
    }
    return "";
  }

  function submit(countries: string[]) {
    dispatch(
      setFilters({
        ...filters,
        country: countries,
      })
    );
    setFilterOpen(false);
  }

  if (countries.data && Object.keys(countries.data).length === 1) {
    return null;
  }

  return (
    <div className="mr-2">
      <button
        className="border border-gray-300 h-10 rounded-lg text-gray-600 bg-white hover:bg-gray-100 font-medium text-sm px-2 py-1 text-center inline-flex items-center"
        type="button"
        onClick={() => setFilterOpen(true)}
      >
        <GlobeAltIcon className="h-6 w-6" aria-hidden="true" />
        <span className="px-2">Countries</span>
        {filters.country?.length > 0 && (
          <span className="flex items-center justify-center w-5 h-5 rounded-xl bg-pink-500 text-white text-xs mr-1">
            {filters.country?.length}
          </span>
        )}
        <ChevronDownIcon className="h-4 w-4" aria-hidden="true" />
      </button>
      <Filter
        title="Countries"
        searchPlaceholder="Search a country"
        items={countries.data}
        initialItems={filters.country}
        getIcon={getIcon}
        iconSize={6}
        isLoading={countries.isLoading}
        isOpen={isFilterOpen}
        onSubmit={submit}
        onClose={() => setFilterOpen(false)}
      />
    </div>
  );
}
