import DashboardLayout from "@components/layouts/dashboard";
import DetailedLayout from "@components/layouts/detailed";

import { useRouter } from "next/router";
import apps from "@apps/index";
import { appMenu } from "./overview";

export default function AppPage() {
  const { query, isReady } = useRouter();

  if (!isReady) {
    return null;
  }

  const AppViewer = apps[query.name].app;

  return (
    <DetailedLayout app={query.name} pageMenu={appMenu} fullScreen={true}>
      {AppViewer ? <AppViewer /> : <div>Ops...something goes wrong.</div>}
    </DetailedLayout>
  );
}

AppPage.Layout = DashboardLayout;
