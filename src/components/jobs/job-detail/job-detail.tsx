import { icons } from "../../../constants";
import { useJobQuery } from "../../../api/jobs/get-job";
import {
  LocationMarkerIcon,
  OfficeBuildingIcon,
  PhoneIcon,
} from "@heroicons/react/outline";

export function JobDetail() {
  // const store = useSelector(
  //   (state: any) => state.store.selectedStore?.properties
  // );

  const { data, isLoading, error }: any = useJobQuery(112);

  if (!data) {
    return null;
  }

  return (
    <div className="pb-32">
      <header>
        <img src={data.banner_url} />
        <div className="flex items-center absolute top-40 left-16 w-1/2 rounded-lg bg-slate-100 p-2 pl-5">
          <img
            src={icons.amrest.markers[data.store.brand.name.toLowerCase()]}
            alt="Picture of the restaurant"
            className="object-cover h-24"
          />
          <div className="flex flex-col items-start px-4 py-2 space-y-2">
            <p className="text-black whitespace-nowrap font-semibold text-2xl"></p>
            <p className="flex">
              <OfficeBuildingIcon className="w-6 h-6 mr-2" />
              <span className="font-semibold">
                {data.store.brand.full_name} {data.store.name}
              </span>
            </p>
            <p className="flex">
              <LocationMarkerIcon className="w-6 h-6 mr-2" />
              {data.store.address}
            </p>
            <p className="flex">
              <PhoneIcon className="w-6 h-6 mr-2" />
              {data.store.phone}
            </p>
          </div>
        </div>
      </header>
      <main className="py-4 px-8">
        <div dangerouslySetInnerHTML={{ __html: data.body }} />
        <div className="flex justify-end">
          <a
            href={data.apply_url}
            className="bg-orange-400 rounded-md px-10 py-4 font-semibold"
          >
            Aplikuj
          </a>
        </div>
      </main>
      <footer className="text-center">
        Copyright @ {data.store.brand.full_name}
      </footer>
    </div>
  );
}
