import Container from "@components/ui/container";
import Layout from "@components/layout/layout";
import Map from "@components/map";
import { useStoresQuery } from "@api/stores/get-all-stores";
import StoreList from "@components/store/store-list";

import { Sidebar } from "@components/layout/sidebar";
import { Header } from "@components/layout/header";
import { Footer } from "@components/layout/footer";

export default function Home() {
  const { data, isLoading, error } = useStoresQuery({
    brand: "kfc",
    country: "pl",
  });

  return (
    //   <div classNameName="grid grid-cols-2 gap-4">
    //     <StoreList
    //       selectedStoreId={null}
    //       stores={data?.features}
    //     />
    //     <Map cluster={true} locations={data} />
    //   </div>

    <div className="flex flex-row min-h-screen bg-gray-100 text-gray-800">
      <Sidebar />
      <main className="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
        <Header />
        <div className="main-content flex flex-col flex-grow p-4">
          <div className="flex flex-col flex-grow border-4 border-gray-400 border-dashed bg-white rounded mt-4">
            <Map cluster={true} locations={data} />
          </div>
        </div>
        <Footer />
      </main>
    </div>
  );
}

Home.Layout = Layout;
