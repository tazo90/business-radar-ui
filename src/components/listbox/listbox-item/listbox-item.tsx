import restaurantImg from "../../../assets/restaurant.jpg";

import { LocationMarkerIcon } from "@heroicons/react/outline";
import { ListboxItemDetails } from "./listbox-item-details";
import { ListboxItemSummary } from "./listbox-item-summary";
import { ListboxItemRating } from "./listbox-item-rating";

export function ListboxItem({ item, distance, isActive }) {
  return (
    <article className="flex drop-shadow-lg justify-between h-32 cursor-pointer border border-gray-500 rounded-md py-2 px-3 bg-gray-600 dark:bg-gray-600 text-xs text-gray-100 dark:text-gray-100 mb-2 hover:bg-gray-700 focus:bg-slate-300">
      <div className="relative h-24 w-24 hidden xs:flex">
        <img
          className="rounded-2xl object-cover"
          src={restaurantImg}
          alt="Picture of the restaurant"
        />
      </div>
      <ListboxItemDetails item={item} />
      <div className="flex flex-col justify-between">
        <ListboxItemSummary />
        {distance && (
          <div className="flex">
            <LocationMarkerIcon className="w-4 h-4 mr-2" />
            <span className="font-semibold">{distance.toFixed(1)} km</span>
          </div>
        )}
        <ListboxItemRating />
      </div>
    </article>
  );
}
