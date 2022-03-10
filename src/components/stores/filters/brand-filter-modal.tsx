import { useEffect, useState } from "react";

import { Search } from "../../common/search";
import { icons } from "../../../constants";
import { FilterSkeleton } from "./filter-skeleton";

export function BrandFilterModal({
  brands,
  isLoading,
  selectedBrands,
  onSelect,
  onSelectAll,
  onClear,
  onClose,
}) {
  const [filteredBrands, setFilteredBrands] = useState({});

  useEffect(() => {
    if (brands) {
      setFilteredBrands(brands);
    }
  }, [brands]);

  function onSearch(event) {
    const value = event.target.value.toLowerCase();
    if (value === "") {
      setFilteredBrands(brands);
      return;
    }

    let filteredBrands = {};
    Object.keys(brands).map((brandId) => {
      const brand = brands[brandId];
      if (brand.full_name.toLowerCase().startsWith(value)) {
        filteredBrands[brandId] = brand;
      }
    });
    setFilteredBrands(filteredBrands);
  }

  function renderHeader() {
    return (
      <div className="flex justify-between border-b p-3">
        <h3
          className="text-lg leading-6 font-medium text-gray-600"
          id="modal-title"
        >
          Brands
        </h3>
        <button onClick={() => onClose()}>
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    );
  }

  function renderContent() {
    return (
      <div className="p-2">
        <Search
          onSearch={onSearch}
          placeholder="Find a brand..."
          bgColor="bg-gray-200"
        />
        <div className="flex items-center justify-between mx-2 mt-2">
          <button
            className="text-md text-blue-400 uppercase font-semibold"
            onClick={onSelectAll}
          >
            Select all
          </button>
          <button
            className="text-md text-blue-400 uppercase font-semibold"
            onClick={onClear}
          >
            Clear
          </button>
        </div>
        <div className="flex flex-col mb-2">{renderOptions()}</div>
      </div>
    );
  }

  function renderOptions() {
    if (isLoading) {
      return <FilterSkeleton />;
    }

    if (Object.keys(filteredBrands).length === 0) {
      return <p className="text-center">No results</p>;
    }

    return Object.keys(filteredBrands).map((brandId, index) => {
      const isChecked = selectedBrands.includes(brandId);

      return (
        <label
          className={`inline-flex items-center py-0.5 mt-3 rounded-md cursor-pointer ${
            isChecked && "bg-gray-200"
          }`}
          key={index}
        >
          <input
            id={brandId}
            type="checkbox"
            className="form-checkbox h-6 w-6 text-green-600 rounded-md ml-2 focus:ring-0 "
            checked={isChecked}
            onChange={() => onSelect(brandId)}
          />
          <img
            className="object-cover h-[30px] ml-4"
            src={icons.amrest.brands[brandId]}
          />
          <span className="text-xs font-semibold text-gray-500 ml-4">
            {brands[brandId].full_name}
          </span>
        </label>
      );
    });
  }

  function renderFooter() {
    const selectedItemsNum = Object.keys(selectedBrands).length;
    const totalItemsNum = Object.keys(brands).length;

    return (
      <div className="bg-gray-100 p-2 sm:px-4 border-t border-gray-300">
        <div className="flex items-center justify-between">
          <p>
            {selectedItemsNum} of {totalItemsNum}
          </p>
          <div className="flex">
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:w-auto sm:text-sm"
              onClick={() => onClose()}
            >
              Cancel
            </button>
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-400 text-base font-medium text-white hover:bg-blue-500 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed z-10 inset-0 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
          onClick={() => onClose()}
        ></div>

        {/* This element is to trick the browser into centering the modal contents. */}
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                {renderHeader()}
                {renderContent()}
              </div>
            </div>
          </div>
          {renderFooter()}
        </div>
      </div>
    </div>
  );
}
