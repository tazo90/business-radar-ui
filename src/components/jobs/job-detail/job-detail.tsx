import { useSelector } from "react-redux";
import { LocationMarkerIcon, PhoneIcon } from "@heroicons/react/outline";

import icons from "@constants/icons";
import { useJobQuery } from "@api/organization/jobs/get-job";
import { useStoreJobsQuery } from "@api/organization/stores/get-store-jobs";

type JobAppProps = {
  apiKey?: string;
};

export default function JobDetail(props: JobAppProps) {
  const { store, storeTriggerSource } = useSelector((state: any) => {
    return {
      store: state.store.selectedStore?.properties,
      storeTriggerSource: state.store.selectedStoreTriggerSource,
    };
  });

  const organization = "amrest";

  const { queryType, query } =
    storeTriggerSource === "list"
      ? { queryType: useJobQuery, query: { job: store.jobId } }
      : { queryType: useStoreJobsQuery, query: { store: store.id } };

  const { data } = queryType({
    org: organization,
    apiKey: props.apiKey,
    ...query,
  });

  if (!data) {
    return null;
  }

  function getValidBannerUrl(bannerUrl: string) {
    if (!bannerUrl) {
      return "";
    }
    const lastHttp = bannerUrl.lastIndexOf("http");
    return bannerUrl.substring(lastHttp, bannerUrl.length);
  }

  const bannerUrl = getValidBannerUrl(data?.bannerUrl);

  return (
    <>
      <header>
        <img src={bannerUrl} />
        <div className="flex items-center absolute top-40 left-16 w-5/12 rounded-lg bg-slate-50 p-2 pl-5 opacity-90">
          <div className="flex flex-col items-start px-4 py-2 space-y-2">
            <p className="text-black whitespace-nowrap font-semibold text-2xl"></p>
            <p className="flex items-center justify-center">
              <img
                src={icons.amrest.markers[data.store?.brand.name.toLowerCase()]}
                alt="Picture of the restaurant"
                className="object-cover h-auto"
              />
              <span className="font-semibold ml-2">
                {data.store?.brand?.fullName} {data.store?.name}
              </span>
            </p>
            <p className="flex pl-1">
              <LocationMarkerIcon className="w-6 h-6 mr-4" />
              {data.store?.address}
            </p>
            <p className="flex pl-1">
              <PhoneIcon className="w-6 h-6 mr-4" />
              {data.store?.phone}
            </p>
          </div>
        </div>
      </header>
      <main className="py-4 px-8">
        <div dangerouslySetInnerHTML={{ __html: data.body }} />
        <div className="flex justify-center">
          <a
            href={data.applyUrl}
            className="bg-orange-400 rounded-md px-20 py-3 font-semibold"
          >
            Aplikuj
          </a>
        </div>
      </main>
      <footer className="text-center">
        Copyright @ {data.store?.brand.fullName}
      </footer>
    </>
  );
}
