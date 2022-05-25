import dynamic from "next/dynamic";
import { useState } from "react";

import { useJobsQuery } from "@api/organization/jobs/get-all-jobs";
import { ListboxJob } from "@components/jobs/listbox-job/listbox-job";

const BaseApp = dynamic(() => import("@apps/base-app"));
const JobDetail = dynamic(() => import("@components/jobs/job-detail"));
const DashboardLayout = dynamic(() => import("@components/layouts/dashboard"));

type JobsAppProps = {
  apiKey?: string;
};

export default function JobsApp(props: JobsAppProps) {
  const { apiKey } = props;
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const organization = "amrest";

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
    />
  );
}

JobsApp.Layout = DashboardLayout;
