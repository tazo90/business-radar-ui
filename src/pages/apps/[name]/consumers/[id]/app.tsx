import { useRouter } from "next/router";

import DashboardLayout from "@components/layouts/dashboard";
import DetailedLayout from "@components/layouts/detailed";
import { appMenu, MenuHeader } from "./overview";
import apps from "@apps/index";
import { useEffect } from "react";

export default function ConsumerApp() {
  const { query, isReady } = useRouter();

  if (!isReady) {
    return null;
  }

  const AppViewer = apps[query.name].app;

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
