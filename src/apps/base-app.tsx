import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  MenuIcon,
  MapIcon,
  LocationMarkerIcon,
} from "@heroicons/react/outline";

import { BrandFilter, CountryFilter, MoreFilter } from "@apps/stores/filters";
import { setStore, setStores } from "@slices/store.slice";
import { setUserLocation } from "@slices/location.slice";
import { useBrandsQuery } from "@api/organization/get-all-brands";
import { useCountriesQuery } from "@api/organization/get-all-countries";

const Drawer = dynamic(() => import("@components/ui/drawer"));
const Autocomplete = dynamic(() => import("@components/ui/autocomplete"));
const Listbox = dynamic(() => import("@components/listbox/listbox"));
const DashboardLayout = dynamic(() => import("@components/layouts/dashboard"));
const Map = dynamic(() => import("@components/map"));
const Search = dynamic(() =>
  import("@components/common/search").then(
    (mod) => mod.Search,
    () => null as never
  )
);

type BaseAppProps = {
  app: string;
  apiKey?: string;
  data: any;
  organization: string;
  isAuthorized: boolean | null;
  isLoading: boolean;
  listboxRenderer?: any;
  DetailView: any;
  searchFields?: string[];
};

function AppFilters(props) {
  const { brands, countries } = props;
  const { config } = useSelector((state: any) => state.app);

  const filters: any = {
    brand: <BrandFilter brands={brands} />,
    country: <CountryFilter countries={countries} />,
    more: <MoreFilter />,
  };

  if (!config.filters) return null;

  return config.filters.map((filter: string, index: number) => (
    <div key={index}>{filters[filter]}</div>
  ));
}

export default function BaseApp(props: BaseAppProps) {
  const {
    isAuthorized,
    isLoading,
    app,
    apiKey,
    organization,
    data,
    listboxRenderer,
    DetailView,
    searchFields,
  } = props;

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

  const brands: any = useBrandsQuery({
    org: organization,
    apiKey,
  });

  const countries: any = useCountriesQuery({
    org: organization,
    apiKey,
  });

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

        let result =
          address.includes(searchValue) ||
          name.includes(searchValue) ||
          searchValue === brand ||
          fullName.startsWith(searchValue);

        if (searchFields) {
          searchFields.map(
            (field) =>
              (result =
                result || properties[field].toLowerCase().includes(searchValue))
          );
        }

        return result;
      }),
    };

    setDrawerOpen(false);
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

  if (isAuthorized === null) {
    // Add skeleton here
    return <div>Loading app</div>;
  }

  if (isAuthorized === false) {
    return <div>Access denied</div>;
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
        <nav className="flex flex-col md:flex-row pt-2 md:pt-0 px-3 bg-gray-50 border-b w-full">
          <div className="flex items-center w-full md:w-5/12 lg:w-4/12">
            <Search onSearch={onStoreSearch} placeholder={`Find a ${app}...`} />

            <button
              className="ml-4 md:ml-2 border border-gray-300 h-10 rounded-lg text-white bg-lime-600 font-medium text-sm px-2 py-1 text-center inline-flex items-center"
              type="button"
              onClick={orderStart}
            >
              <LocationMarkerIcon className="h-5 w-5" aria-hidden="true" />
              <span className="px-2">Find address</span>
            </button>
            <button
              className="ml-2 lg:hidden border border-gray-300 h-10 rounded-lg text-white bg-slate-700 font-medium text-sm px-2 py-1 text-center inline-flex items-center"
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
            <AppFilters brands={brands} countries={countries} />
          </div>
        </nav>
      </section>
      <div
        className="flex relative w-screen xs:w-full"
        style={{ height: "calc(100vh - 105px)" }}
      >
        {/* Section stores list */}
        <section
          id="store-list-section"
          className={`flex flex-col justify-center z-30 px-4 pb-4 pt-0 flex-none bg-gray-50 min-h-0 overflow-auto transform ease-in-out ${
            selectedStore
              ? "w-1/2 transition-all opacity-0 delay-300 duration-500 -translate-x-full"
              : "w-full lg:w-4/12 transition-all opacity-100 duration-500"
          } ${isMapVisible && "hidden"}`}
        >
          <Listbox
            name={app}
            forwardedRef={storeList}
            isLoading={isLoading}
            items={stores?.features}
            ItemRenderer={listboxRenderer}
          />
        </section>
        {/* Section map */}
        <section
          aria-label="main content"
          className={`min-h-0 flex-col flex-auto border-l ${
            isMapVisible ? "flex" : "hidden"
          } lg:flex`}
        >
          <Map
            locations={stores}
            storeList={storeList}
            organization={organization}
            brands={brands}
          />
        </section>
        {/* Drawer */}
        <Drawer isOpen={isDrawerOpen} setDrawerOpen={setDrawerOpen}>
          {isDrawerOpen && <DetailView isOpen={isDrawerOpen} apiKey={apiKey} />}
        </Drawer>
      </div>
    </>
  );
}

BaseApp.Layout = DashboardLayout;
