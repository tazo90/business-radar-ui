import { useRouter } from "next/router";

import DashboardLayout from "@components/layouts/dashboard";
import DetailedLayout from "@components/layouts/detailed";
import { appMenu } from "./overview";
import apps from "@apps/index";
import { trpc } from "@lib/trpc";

export default function ConsumerApp() {
  const { query, isReady } = useRouter();

  const { data } = trpc.useQuery(["api.consumer.get", { uid: query.id }], {
    enabled: isReady,
  });

  if (!isReady || !data) {
    return null;
  }

  const AppViewer = apps[query.name].app;

  return (
    <DetailedLayout
      app={query.name}
      subtitle={data?.title}
      pageMenu={appMenu}
      fullScreen={true}
    >
      {AppViewer ? (
        <AppViewer apiKey={data.apiKey} />
      ) : (
        <div>Ops...something goes wrong.</div>
      )}
    </DetailedLayout>
  );
}

ConsumerApp.Layout = DashboardLayout;
