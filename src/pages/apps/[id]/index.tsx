import DashboardLayout from "@components/layouts/dashboard";
import DetailedLayout from "@components/layouts/detailed";
import { PencilAltIcon, ViewGridIcon } from "@heroicons/react/outline";
import {
  CogIcon,
  CubeIcon,
  EyeIcon,
  LocationMarkerIcon,
  TerminalIcon,
} from "@heroicons/react/solid";

import { useRouter } from "next/router";
import apps from "@components/apps";

export const appMenu = [
  {
    name: "Overview",
    href: "/apps/:id",
    icon: PencilAltIcon,
  },
  {
    name: "Application",
    href: "/apps/:id/app",
    icon: TerminalIcon,
  },
  {
    name: "Manage",
    href: "/apps/:id/manage",
    icon: CogIcon,
  },
  {
    name: "Embeedings",
    href: "/apps/:id/embeedings",
    icon: EyeIcon,
  },
  {
    name: "Themes",
    href: "/apps/:id/themes",
    icon: CubeIcon,
  },
];

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

  const AppViewer = apps[query.id];

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
