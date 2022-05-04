import DashboardLayout from "@components/layouts/dashboard";
import DetailedLayout from "@components/layouts/detailed";
import { useRouter } from "next/router";
import { appMenu, MenuHeader } from "./overview";

export default function ProjectAppIntegrationsPage() {
  const router = useRouter();

  return (
    <DetailedLayout
      pageMenu={appMenu}
      pageTitle="Consumer"
      pageMenuHeader={<MenuHeader />}
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

ProjectAppIntegrationsPage.Layout = DashboardLayout;
