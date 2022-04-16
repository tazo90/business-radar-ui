import { Fragment, useEffect, useState } from "react";
import { Combobox, Dialog, Transition } from "@headlessui/react";
import { SearchIcon } from "@heroicons/react/solid";
import {
  InformationCircleIcon,
  LocationMarkerIcon,
} from "@heroicons/react/outline";

import { useGeocodingQuery } from "@api/geocoding/geocoding";
import { useDebounce } from "@lib/hooks/useDebounce";
import { classNames } from "@lib/classnames";

function renderPlaceHouse({
  street,
  housenumber,
  postcode,
  county,
  country,
  city,
  state,
}) {
  return (
    <div className="flex flex-col">
      <span className="ml-3 flex-auto truncate font-semibold">
        {street} {housenumber}
      </span>
      <span className="ml-3 flex-none text-gray-200">
        {postcode} {county || city}, {state || country}
      </span>
    </div>
  );
}

function renderPlaceCity({ name, state, county, country }) {
  return (
    <div className="flex flex-col">
      <span className="ml-3 flex-auto truncate font-semibold">{name}</span>
      <span className="ml-3 flex-none text-gray-200">
        {state || county}, {country}
      </span>
    </div>
  );
}

export default function Autocomplete({ open, setOpen, onAddressClick }) {
  const [query, setQuery] = useState("");
  const [locations, setLocations] = useState([]);

  const { data, refetch, isLoading, error }: any = useGeocodingQuery(
    {
      q: query,
      limit: 5,
      osm_tag: "!:administrative",
    },
    {
      enabled: false,
    }
  );

  useEffect(() => {
    if (query !== "") {
      refetch();
    } else {
      setLocations([]);
    }
  }, [query]);

  useEffect(() => {
    if (data) {
      setLocations(data.features);
    }
  }, [data]);

  return (
    <Transition.Root show={open} as={Fragment} afterLeave={() => setQuery("")}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-20"
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-50 transition-opacity" />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Combobox
            value={null}
            as="div"
            className="relative inset-y-1/3 mx-auto max-w-2xl transform divide-y divide-gray-500 divide-opacity-20 overflow-hidden rounded-xl bg-gray-700 shadow-2xl transition-all"
            onChange={(item) => onAddressClick(item)}
          >
            <div className="relative">
              <SearchIcon
                className="pointer-events-none absolute top-3.5 left-4 h-5 w-5 text-gray-300"
                aria-hidden="true"
              />
              <Combobox.Input
                className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-white placeholder-gray-300 focus:ring-0 sm:text-sm"
                placeholder="Search..."
                onChange={useDebounce(
                  (event) => setQuery(event.target.value),
                  300
                )}
              />
            </div>

            {(query === "" || locations?.length > 0) && (
              <Combobox.Options
                static
                className="max-h-80 scroll-py-2 divide-y divide-gray-500 divide-opacity-20 overflow-y-auto"
              >
                <li className="p-2">
                  {query === "" && (
                    <h2 className="mt-4 mb-2 px-3 text-xs font-semibold text-gray-200">
                      Recent searches
                    </h2>
                  )}
                  <ul className="text-sm text-gray-300">
                    {locations?.map((location) => {
                      const { properties } = location;
                      const { osm_key, osm_value } = properties;

                      return (
                        <Combobox.Option
                          key={properties.osm_id}
                          value={location}
                          className={({ active }) =>
                            classNames(
                              "flex cursor-pointer select-none items-center rounded-md px-3 py-2",
                              active && "bg-gray-800 text-white"
                            )
                          }
                        >
                          {({ active }) => (
                            <>
                              <LocationMarkerIcon
                                className={classNames(
                                  "h-6 w-6 flex-none",
                                  active ? "text-white" : "text-gray-300"
                                )}
                                aria-hidden="true"
                              />
                              {osm_value === "house" ||
                              osm_value === "plot" ||
                              osm_key === "building"
                                ? renderPlaceHouse(properties)
                                : renderPlaceCity(properties)}
                            </>
                          )}
                        </Combobox.Option>
                      );
                    })}
                  </ul>
                </li>
              </Combobox.Options>
            )}

            {query !== "" && locations?.length === 0 && (
              <div className="py-14 px-6 text-center sm:px-14">
                <InformationCircleIcon
                  className="mx-auto h-6 w-6 text-gray-300"
                  aria-hidden="true"
                />
                <p className="mt-4 text-sm text-gray-200">
                  We couldn't find any place with that address. Please try
                  again.
                </p>
              </div>
            )}
          </Combobox>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
}
