import { Rating } from "@components/ui/rating";
import icons from "@constants/icons";
import { LocationMarkerIcon } from "@heroicons/react/solid";
import { classNames } from "@lib/classnames";

export function ListboxJobDetails({ job, distance }) {
  return (
    <div className="flex flex-col h-full w-full xs:w-[78%]">
      <div className="flex items-center justify-between relative pl-3 pr-4 min-h-fit w-full rounded-3xl bg-white dark:bg-gray-100 text-gray-900 dark:text-gray-800">
        <div className="flex relative h-7 w-7">
          <img
            src={icons.amrest.markers[job.brand]}
            alt="Picture of the restaurant"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col items-center ml-2 pt-0.5 overflow-hidden">
          <span className="relative font-semibold leading-none text-[0.85rem] ">
            {job.title}
          </span>
          <span className="pb-0.5 leading-1 w-full truncate text-[0.82rem] ">
            {job.brand_full.toUpperCase()} {job.name}
          </span>
        </div>
        <div className="flex relative bottom-1.5 right-0 w-2 h-2 rounded-full bg-green-600"></div>
      </div>
      <div className="text-[0.82rem] leading-snug pt-2 space-y-0.5">
        <p className="truncate">
          <span className="font-bold">Address:</span> {job.address}
        </p>
        <div
          className={classNames(
            "flex",
            job.phone ? "justify-between" : "justify-end"
          )}
        >
          {job.phone && (
            <p>
              <span className="font-bold">Phone:</span> {job.phone}
            </p>
          )}
          {distance && (
            <div className="flex items-center justify-end">
              <LocationMarkerIcon className="w-3 h-3 mr-0.5" />
              <span className="text-xs">{distance.toFixed(1)} km</span>
            </div>
          )}
        </div>
        <div className="flex justify-between">
          <p>
            <span className="font-bold">Hours:</span> 08:00 - 16:00 -{" "}
            <span className="font-semibold text-green-500">Open</span>
          </p>
          <Rating count={120} rate={3.6} stars={1} textSize="text-xs" />
        </div>
      </div>
    </div>
  );
}
