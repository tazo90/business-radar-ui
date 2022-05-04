import DashboardLayout from "@components/layouts/dashboard";
import DetailedLayout from "@components/layouts/detailed";
import { LocationMarkerIcon } from "@heroicons/react/solid";

import { useRouter } from "next/router";
import apps from "@components/apps";
import { appMenu } from "./overview";

const MenuHeader = () => (
  <div className="flex items-center">
    <div className="flex p-2 text-gray-900 text-xs font-medium bg-yellow-400 rounded-md">
      <LocationMarkerIcon className="h-4 w-4" />
    </div>
    <h3 className="ml-2 text-gray-900 text-md font-semibold truncate">
      Stores
    </h3>
  </div>
);
export default function AppPage() {
  const { query } = useRouter();

  const AppViewer = apps[query.name];

  return (
    <DetailedLayout
      pageMenu={appMenu}
      pageMenuHeader={<MenuHeader />}
      fullScreen={true}
    >
      {AppViewer ? <AppViewer /> : <div>Ops...something goes wrong.</div>}
    </DetailedLayout>
  );
}

AppPage.Layout = DashboardLayout;
