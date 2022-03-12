import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MenuIcon, MapIcon } from "@heroicons/react/outline";

import Layout from "../../components/layout/layout";
import Map from "../../components/map";
import { Footer } from "../../components/layout/footer";
import { Search } from "../../components/common/search";
import StoreList from "../../components/stores/store-list/store-list";
import {
  BrandFilter,
  CountryFilter,
  MoreFilter,
} from "../../components/stores/filters";
import { setStores } from "../../slices/store.slice";
import { useStoresQuery } from "../../api/stores/get-all-stores";
import Drawer from "../../components/ui/drawer";

export default function Stores() {
  const dispatch = useDispatch();

  const { stores, selectedStore } = useSelector((state: any) => state.store);
  const storeList = useRef(null);

  const [isMapVisible, setMapVisible] = useState(false);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (selectedStore) {
      setDrawerOpen(true);
    }
  }, [selectedStore]);

  const { data, isLoading, error }: any = useStoresQuery({
    brand: "kfc",
    country: "pl",
  });

  useEffect(() => {
    if (data) {
      dispatch(setStores(data.features));
    }
  }, [data]);

  function onStoreSearch(event) {
    const { value } = event.target;

    if (value === "") {
      dispatch(setStores(data.features));
      return;
    }

    if (!stores) {
      return [];
    }

    const filteredStores = data?.features.filter(({ properties }) => {
      const address = properties.address.toLowerCase();
      const name = properties.name.toLowerCase();
      const loc = value.toLowerCase();

      return address.includes(loc) | name.includes(loc);
    });

    dispatch(setStores(filteredStores));
  }

  return (
    <>
      <section className="flex">
        {/* Section filters */}
        <nav className="flex flex-col md:flex-row pt-2 md:pt-0 px-3 bg-gray-100 border w-full">
          <div className="flex items-center w-full md:w-5/12 lg:w-4/12">
            <Search
              className="w-full md:mr-4"
              onSearch={onStoreSearch}
              placeholder="Find a store..."
              bgColor="bg-gray-300"
            />
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
          className={`flex flex-col z-0 px-4 pb-4 pt-0 flex-none bg-gray-100 min-h-0 overflow-auto transform ease-in-out ${
            selectedStore
              ? "w-1/2 transition-all opacity-0 delay-400 duration-500 -translate-x-full"
              : "w-full lg:w-4/12 transition-all opacity-100 duration-500"
          } ${isMapVisible && "hidden"}`}
        >
          <StoreList ref={storeList} isLoading={isLoading} stores={stores} />
        </section>
        {/* Section map */}
        <section
          aria-label="main content"
          className={`min-h-0 flex-col flex-auto border-l ${
            isMapVisible ? "flex" : "hidden"
          } lg:flex`}
        >
          <Map cluster={true} locations={data} storeList={storeList} />
          <Footer />
        </section>
        {/* Drawer */}
        <Drawer isOpen={isDrawerOpen} setDrawerOpen={setDrawerOpen}>
          test
        </Drawer>
      </div>
    </>
  );
}

Stores.Layout = Layout;
