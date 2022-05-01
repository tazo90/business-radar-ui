import DashboardLayout from "@components/layouts/dashboard";
import { trpc } from "@lib/trpc";
import { useRouter } from "next/router";
import apps from "@components/apps";
import DetailedLayout from "@components/layouts/detailed";
import { appMenu } from ".";

export default function AppPreviewPage() {
  const { query } = useRouter();

  const { isFetching, data: app } = trpc.useQuery([
    "api.application.get",
    { uid: query.id },
  ]);

  const appType = app?.type.toLowerCase();

  if (!appType) {
    return <div>Ops...something goes wrong.</div>;
  }

  const AppViewer = apps[app?.type.toLowerCase()];

  return (
    <DetailedLayout pageMenu={appMenu} fullScreen={true}>
      <AppViewer />
    </DetailedLayout>
  );
}

AppPreviewPage.Layout = DashboardLayout;
