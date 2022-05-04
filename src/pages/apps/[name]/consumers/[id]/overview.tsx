import DashboardLayout from "@components/layouts/dashboard";
import DetailedLayout from "@components/layouts/detailed";
import { PencilAltIcon, ViewGridIcon } from "@heroicons/react/outline";
import { CubeIcon, EyeIcon, LocationMarkerIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";

export const appMenu = [
  {
    name: "Overview",
    href: "/apps/:name/consumers/:id/overview",
    icon: PencilAltIcon,
  },
  {
    name: "Application",
    href: "/apps/:name/consumers/:id/app",
    icon: EyeIcon,
  },
  {
    name: "Components",
    href: "/apps/:name/consumers/:id/components",
    disabled: true,
    icon: CubeIcon,
  },
];

export const MenuHeader = () => (
  <div className="flex items-center">
    <div className="flex p-2 text-gray-900 text-xs font-medium bg-yellow-400 rounded-md">
      <LocationMarkerIcon className="h-4 w-4" />
    </div>
    <h3 className="ml-2 text-gray-900 text-md font-semibold truncate">
      Stores / AmSpace
    </h3>
  </div>
);

export default function ConsumerPage() {
  const router = useRouter();

  return (
    <DetailedLayout
      pageMenu={appMenu}
      pageMenuHeader={<MenuHeader />}
      pageTitle="Consumer"
    >
      APP {router.query.id}
    </DetailedLayout>
  );
}

ConsumerPage.Layout = DashboardLayout;
