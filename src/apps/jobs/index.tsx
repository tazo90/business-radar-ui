import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { useJobsQuery } from "@api/organization/jobs/get-all-jobs";
import { ListboxJob } from "@apps/jobs/listbox-job/listbox-job";
import { setAppConfig } from "@slices/app.slice";

import appConfig from "@apps/jobs/config.yml";

const BaseApp = dynamic(() => import("@apps/base-app"));
const JobDetail = dynamic(() => import("@apps/jobs/job-detail"));
const DashboardLayout = dynamic(() => import("@components/layouts/dashboard"));

type JobsAppProps = {
  apiKey?: string;
};

export default function JobsApp(props: JobsAppProps) {
  const dispatch = useDispatch();
  const { apiKey } = props;
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const organization = "amrest";

  useEffect(() => {
    dispatch(setAppConfig(appConfig));
  }, []);

  const { data, isLoading }: any = useJobsQuery(
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
      app="job"
      apiKey={apiKey}
      data={data}
      isLoading={isLoading}
      isAuthorized={isAuthorized}
      listboxRenderer={ListboxJob}
      DetailView={JobDetail}
      searchFields={["title"]}
    />
  );
}

JobsApp.Layout = DashboardLayout;
