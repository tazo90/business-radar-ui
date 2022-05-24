import dynamic from "next/dynamic";
import { useState } from "react";

import { useStoresQuery } from "@api/organization/stores/get-all-stores";

const BaseApp = dynamic(() => import("@apps/base-app"));
const DashboardLayout = dynamic(() => import("@components/layouts/dashboard"));

type StoresAppProps = {
  apiKey?: string;
};

export default function StoresApp(props: StoresAppProps) {
  const { apiKey } = props;
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const organization = "amrest";

  const { data, isLoading }: any = useStoresQuery(
    {
      org: organization,
      apiKey: props.apiKey,
    },
    {
      onSuccess() {
        setIsAuthorized(true);
      },
      onError(err: any) {
        if (err.response?.status === 401) {
          setIsAuthorized(false);
        }
      },
      retry: 0,
    }
  );

  return (
    <BaseApp
      organization={organization}
      app="stores"
      apiKey={apiKey}
      data={data}
      isLoading={isLoading}
      isAuthorized={isAuthorized}
    />
  );
}

StoresApp.Layout = DashboardLayout;
