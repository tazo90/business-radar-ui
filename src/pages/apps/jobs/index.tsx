import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MenuIcon, MapIcon, ShoppingBagIcon } from "@heroicons/react/outline";

import DashboardLayout from "../../../components/layouts/dashboard";
import Map from "../../../components/map";
import { Search } from "../../../components/common/search";
import Listbox from "../../../components/listbox/listbox";
import {
  BrandFilter,
  CountryFilter,
  MoreFilter,
} from "../../../components/stores/filters";
import { setStore, setStores } from "../../../slices/store.slice";
import { useJobsQuery } from "../../../api/jobs/get-all-jobs";
import Drawer from "../../../components/ui/drawer";
import Autocomplete from "../../../components/ui/autocomplete";
import { setUserLocation } from "../../../slices/location.slice";
import { ListboxJob } from "../../../components/jobs/listbox-job/listbox-job";
import { JobDetail } from "../../../components/jobs/job-detail";

export default function JobsPage() {
  const dispatch = useDispatch();

  const { stores, selectedStore, filters } = useSelector(
    (state: any) => state.store
  );

  const storeList = useRef(null);

  const [isOpenAutocomplete, setOpenAutocoplete] = useState(false);
  const [isMapVisible, setMapVisible] = useState(false);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (selectedStore) {
      setDrawerOpen(true);
    }
  }, [selectedStore]);

  const { data, isLoading, error }: any = useJobsQuery({});

  useEffect(() => {
    if (data) {
      dispatch(setStores(data));
    }
  }, [data]);

  useEffect(() => {
    let results = data;

    if (data && (filters.brand || filters.country)) {
      results = {
        type: "FeatureCollection",
        features: data.features.filter(({ properties }) => {
          let matchItem = true;

          if (filters.brand.length > 0) {
            matchItem = matchItem && filters.brand.includes(properties.brand);
          }

          if (filters.country.length > 0) {
            matchItem =
              matchItem && filters.country.includes(properties.country);
          }

          return matchItem;
        }),
      };

      dispatch(setStores(results));
    }
  }, [filters]);

  function onStoreSearch(event) {
    const { value } = event.target;

    if (value === "") {
      dispatch(setStores(data));
      return;
    }

    if (!stores) {
      return [];
    }

    const filteredStores = {
      type: "FeatureCollection",
      features: data?.features.filter(({ properties }) => {
        const brand = properties.brand_full.toLowerCase();
        const name = properties.name.toLowerCase();
        const address = properties.address.toLowerCase();
        const fullName = `${brand} ${name}`;
        const searchValue = value.toLowerCase();

        return (
          address.includes(searchValue) ||
          name.includes(searchValue) ||
          searchValue === brand ||
          fullName.startsWith(searchValue)
        );
      }),
    };

    dispatch(setStore(null));
    dispatch(setStores(filteredStores));
  }

  function orderStart() {
    setOpenAutocoplete(true);
  }

  function onAddressClick(address) {
    dispatch(setUserLocation(address));
    setOpenAutocoplete(false);
  }

  return (
    <>
      <section className="flex">
        <Autocomplete
          open={isOpenAutocomplete}
          onAddressClick={onAddressClick}
          setOpen={setOpenAutocoplete}
        />
        {/* Section filters */}
        <nav className="flex flex-col md:flex-row pt-2 md:pt-0 px-3 bg-gray-100 border w-full">
          <div className="flex items-center w-full md:w-5/12 lg:w-4/12">
            <Search
              className="w-full md:mr-4"
              onSearch={onStoreSearch}
              placeholder="Find a job offer..."
              bgColor="bg-gray-300"
            />
            <button
              className="ml-4 md:ml-0  border border-gray-300 h-10 rounded-lg text-white bg-lime-600 font-medium text-sm px-2 py-1 text-center inline-flex items-center"
              type="button"
              onClick={orderStart}
            >
              <ShoppingBagIcon className="h-5 w-5" aria-hidden="true" />
              <span className="px-2">Zamów</span>
            </button>
            <button
              className="ml-4 md:ml-0 lg:hidden border border-gray-300 h-10 rounded-lg text-white bg-slate-700 font-medium text-sm px-2 py-1 text-center inline-flex items-center"
              type="button"
              onClick={() => setMapVisible(!isMapVisible)}
            >
              {isMapVisible ? (
                <>
                  <MenuIcon className="h-5 w-5" aria-hidden="true" />
                  <span className="px-2">List</span>
                </>
              ) : (
                <>
                  <MapIcon className="h-5 w-5" aria-hidden="true" />
                  <span className="px-2">Map</span>
                </>
              )}
            </button>
            <div className="hidden md:block lg:hidden bg-gray-300 h-3/5 w-0.5 ml-2" />
          </div>
          <div className="flex overflow-x-auto items-center py-2">
            <div className="mr-2 md:ml-2">
              <BrandFilter />
            </div>
            <div className="mr-2">
              <CountryFilter />
            </div>
            <div className="mr-2">
              <MoreFilter />
            </div>
          </div>
        </nav>
      </section>
      <div className="flex relative h-screen w-screen xs:w-full">
        {/* Section stores list */}
        <section
          id="store-list-section"
          className={`flex flex-col justify-center z-0 px-4 pb-4 pt-0 flex-none bg-gray-100 min-h-0 overflow-auto transform ease-in-out ${
            selectedStore
              ? "w-1/2 transition-all opacity-0 delay-400 duration-500 -translate-x-full"
              : "w-full lg:w-4/12 transition-all opacity-100 duration-500"
          } ${isMapVisible && "hidden"}`}
        >
          <Listbox
            name="job"
            ref={storeList}
            isLoading={isLoading}
            items={stores?.features}
            ItemRenderer={ListboxJob}
          />
        </section>
        {/* Section map */}
        <section
          aria-label="main content"
          className={`min-h-0 flex-col flex-auto border-l ${
            isMapVisible ? "flex" : "hidden"
          } lg:flex`}
        >
          <Map locations={stores} storeList={storeList} />
        </section>
        {/* Drawer */}
        <Drawer isOpen={isDrawerOpen} setDrawerOpen={setDrawerOpen}>
          <JobDetail />
        </Drawer>
      </div>
    </>
  );
}

JobsPage.Layout = DashboardLayout;
