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

export default function Zendesk() {
  const { data, isLoading, error } = useStoresQuery({
    brand: "kfc",
    country: "pl",
  });

  return (
    <div className="h-screen w-full flex overflow-hidden antialiased text-gray-800 bg-white">
      {/* <!-- section body side nav --> */}
      <SideNav />

      <div className="flex-1 flex flex-col">
        {/* <!-- section body top nav --> */}
        <TopNav />

        {/* <!-- main content --> */}
        <main className="flex-grow flex min-h-0 border-t">
          {/* <!-- section sider --> */}
          <section className="flex flex-col p-4 w-full max-w-lg flex-none bg-gray-100 min-h-0 overflow-auto">
            <Search />
            <StoreList stores={data?.features} />
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

            {/* <!-- content footer, currently hidden --> */}
            <Footer />
          </section>
        </main>
      </div>
    </div>
  );
}

Zendesk.Layout = Layout;
