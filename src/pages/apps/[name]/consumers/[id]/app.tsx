import DashboardLayout from "@components/layouts/dashboard";
import DetailedLayout from "@components/layouts/detailed";
import { useRouter } from "next/router";
import { appMenu, MenuHeader } from "./overview";
import apps from "@components/apps";

export default function ConsumerApp() {
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

ConsumerApp.Layout = DashboardLayout;
