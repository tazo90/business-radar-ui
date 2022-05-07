import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HomeIcon, ChevronDownIcon } from "@heroicons/react/outline";

import icons from "@constants/icons";
import { useBrandsQuery } from "@api/organization/get-all-brands";
import { Filter } from "@components/common/filter";
import { setFilters } from "@slices/store.slice";

type BrandFilterProps = {
  apiKey?: string;
}

export function BrandFilter(props: BrandFilterProps) {
  const dispatch = useDispatch();
  const { filters } = useSelector((state: any) => state.store);

  const [isFilterOpen, setFilterOpen] = useState(false);

  const { data, isLoading }: any = useBrandsQuery({ 
    org: "amrest", 
    apiKey: props.apiKey 
  });

  function getIcon(itemId) {
    return icons.amrest.brands[itemId];
  }

  function submit(brands: string[]) {
    dispatch(
      setFilters({
        ...filters,
        brand: brands,
      })
    );
    setFilterOpen(false);
  }

  if (data && Object.keys(data).length === 1) {
    return null;
  }

  return (
    <div className="mr-2 md:ml-2">
      <button
        className="border border-gray-300 h-10 rounded-lg text-gray-600 bg-white hover:bg-gray-100 font-medium text-sm px-2 py-1 text-center inline-flex items-center"
        type="button"
        onClick={() => setFilterOpen(true)}
      >
        <HomeIcon className="h-5 w-5" aria-hidden="true" />
        <span className="px-2">Brands</span>
        {filters.brand?.length > 0 && (
          <span className="flex items-center justify-center w-5 h-5 rounded-xl bg-pink-500 text-white text-xs mr-1">
            {filters.brand?.length}
          </span>
        )}
        <ChevronDownIcon className="h-4 w-4" aria-hidden="true" />
      </button>
      <Filter
        title="Brands"
        searchPlaceholder="Search a brand"
        items={data}
        initialItems={filters.brand}
        getIcon={getIcon}
        isLoading={isLoading}
        isOpen={isFilterOpen}
        onSubmit={submit}
        onClose={() => setFilterOpen(false)}
      />
    </div>
  );
}
