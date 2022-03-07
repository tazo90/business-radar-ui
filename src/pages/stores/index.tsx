import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setStores } from "@slices/store.slice";
import Layout from "@components/layout/layout";
import Map from "@components/map";
import { useStoresQuery } from "@api/stores/get-all-stores";

import { Footer } from "@components/layout/footer";
import { Search } from "@components/common/search";
import { StoreList } from "@components/stores/store-list/store-list";
import { BrandFilter } from "@components/stores/filters/brand-filter";
import { CountryFilter } from "@components/stores/filters/country-filter";
import { StoreListSkeleton } from "@components/stores/store-list/store-list-skeleton";
import { MapButton } from "@components/stores/store-list/map-button";

export default function Stores() {
  const dispatch = useDispatch();

  const { data, isLoading, error } = useStoresQuery({
    brand: "kfc",
    country: "pl",
  });

  const { stores } = useSelector((state) => state.store);

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
      <section className="flex flex-col p-4 w-full lg:w-4/12 flex-none bg-gray-100 min-h-0 overflow-auto">
        <Search onSearch={onStoreSearch} placeholder="Find a store..." />
        {isLoading && <StoreListSkeleton itemsNum={8} />}
        <MapButton />
        <StoreList stores={stores} />
      </section>
      {/* <!-- section content --> */}
      <section
        aria-label="main content"
        className="min-h-0 flex-col flex-auto hidden lg:flex border-l"
      >
        {/* <!-- content navigation --> */}
        <nav className="flex bg-gray-100">
          <BrandFilter />
          <CountryFilter />
        </nav>

        <Map cluster={true} locations={data} />

        <Footer />
      </section>
    </>
  );
}

Stores.Layout = Layout;
