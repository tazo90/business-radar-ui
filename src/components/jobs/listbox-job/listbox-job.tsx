import restaurantImg from "../../../assets/restaurant.jpg";

import { LocationMarkerIcon } from "@heroicons/react/outline";
import { ListboxItemSummary } from "./listbox-item-summary";
import { ListboxItemRating } from "./listbox-item-rating";
import { ListboxJobDetails } from "./listbox-job-details";

export function ListboxJob({ item, distance, isActive }) {
  return (
    <article className="flex drop-shadow-lg justify-between h-32 cursor-pointer border border-gray-500 rounded-md py-2 px-3 bg-gray-100 dark:bg-gray-600 text-xs text-gray-900 dark:text-gray-100 mb-2 hover:bg-slate-300 focus:bg-slate-300">
      <ListboxJobDetails job={item} />
      {/* <div className="flex flex-col justify-between">
        <ListboxItemSummary />
        {distance && (
          <div className="flex">
            <LocationMarkerIcon className="w-4 h-4 mr-2" />
            <span className="font-semibold">{distance.toFixed(1)} km</span>
          </div>
        )}
        <ListboxItemRating />
      </div> */}
    </article>
  );
}
