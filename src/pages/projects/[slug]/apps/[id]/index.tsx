import DashboardLayout from "@components/layouts/dashboard";
import DetailedLayout from "@components/layouts/detailed";
import { PencilAltIcon, ViewGridIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";

export const appMenu = [
  {
    name: "Overview",
    href: "/projects/:slug/apps/:id",
    icon: PencilAltIcon,
  },
  {
    name: "Integrations",
    href: "/projects/:slug/apps/:id/integrations",
    icon: ViewGridIcon,
  },
];

export default function ProjectAppPage() {
  const router = useRouter();

  return (
    <DetailedLayout
      pageMenu={appMenu}
      pageTitle="App"
      header={
        <button
          type="button"
          className="order-0 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:order-1 sm:ml-3"
        >
          Create application
        </button>
      }
    >
      APP {router.query.id}
    </DetailedLayout>
  );
}

ProjectAppPage.Layout = DashboardLayout;
