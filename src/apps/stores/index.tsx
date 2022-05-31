import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { useStoresQuery } from "@api/organization/stores/get-all-stores";
import { setAppConfig } from "@slices/app.slice";

import appConfig from "@apps/stores/config.yml";

const BaseApp = dynamic(() => import("@apps/base-app"));
const StoreDetail = dynamic(() => import("@apps/stores/store-detail"));
const DashboardLayout = dynamic(() => import("@components/layouts/dashboard"));

type StoresAppProps = {
  apiKey?: string;
};

export default function StoresApp(props: StoresAppProps) {
  const dispatch = useDispatch();
  const { apiKey } = props;
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const organization = "amrest";

  useEffect(() => {
    dispatch(setAppConfig(appConfig));
  }, []);

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
      DetailView={StoreDetail}
    />
  );
}

StoresApp.Layout = DashboardLayout;
