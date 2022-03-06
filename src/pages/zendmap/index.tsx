import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setStores } from "@slices/store.slice";
import Layout from "@components/layout/layout";
import Map from "@components/map";
import { useStoresQuery } from "@api/stores/get-all-stores";

import { SideNav } from "./layout/side-nav";
import { TopNav } from "./layout/top-nav";
import { Search } from "./components/common/search";
import { StoreList } from "./stores/store-list/store-list";
import { BrandFilter } from "./stores/filters/brand-filter";
import { CountryFilter } from "./stores/filters/country-filter";
import { Footer } from "./layout/footer";

export default function Zendmap() {
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
    <div className="h-screen w-full flex overflow-hidden antialiased text-gray-800 bg-white">
      <SideNav />
      <div className="flex-1 flex flex-col">
        <TopNav />
        {/* <!-- main content --> */}
        <main className="flex-grow flex min-h-0 border-t">
          {/* <!-- section sider --> */}
          <section className="flex flex-col p-4 w-full max-w-lg flex-none bg-gray-100 min-h-0 overflow-auto">
            <Search onSearch={onStoreSearch} placeholder="Find a store..." />
            <StoreList stores={stores} />
          </section>
          {/* <!-- section content --> */}
          <section
            aria-label="main content"
            className="flex min-h-0 flex-col flex-auto border-l"
          >
            {/* <!-- content navigation --> */}
            <nav className="flex bg-gray-100">
              <BrandFilter />
              <CountryFilter />
            </nav>

            <Map cluster={true} locations={data} />

            <Footer />
          </section>
        </main>
      </div>
    </div>
  );
}

Zendmap.Layout = Layout;
