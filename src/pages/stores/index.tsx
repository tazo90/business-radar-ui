import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Layout from "../../components/layout/layout";
import Map from "../../components/map";
import { Footer } from "../../components/layout/footer";
import { Search } from "../../components/common/search";
import { StoreList } from "../../components/stores/store-list/store-list";
import { BrandFilter } from "../../components/stores/filters/brand-filter";
import { CountryFilter } from "../../components/stores/filters/country-filter";
import { setStores } from "../../slices/store.slice";
import { useStoresQuery } from "../../api/stores/get-all-stores";
import Drawer from "../../components/ui/drawer";

export default function Stores() {
  const dispatch = useDispatch();

  const { stores, selectedStore } = useSelector((state: any) => state.store);

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
        <nav className="flex xs:flex-row py-1 pl-3 bg-gray-100 border w-full">
          <div className="flex items-center justify-between">
            <Search
              onSearch={onStoreSearch}
              placeholder="Find a store..."
              bgColor="bg-gray-300"
            />
            <BrandFilter />
            <CountryFilter />
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
          }`}
        >
          <StoreList isLoading={isLoading} stores={stores} />
        </section>
        {/* Section map */}
        <section
          aria-label="main content"
          className="min-h-0 flex-col flex-auto hidden lg:flex border-l"
        >
          <Map cluster={true} locations={data} />
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
