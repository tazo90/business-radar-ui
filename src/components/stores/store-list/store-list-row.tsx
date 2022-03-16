import restaurantImg from "../../../assets/restaurant.jpg";

import { StoreListRowRating } from "./store-list-row-rating";
import { StoreListRowDetails } from "./store-list-row-details";
import { StoreListRowSummary } from "./store-list-row-summary";
import { LocationMarkerIcon } from "@heroicons/react/outline";

export function StoreListRow({ store, distance, isActive }) {
  return (
    <article className="flex drop-shadow-lg justify-between h-32 cursor-pointer border border-gray-500 rounded-md py-2 px-3 bg-gray-100 dark:bg-gray-600 text-xs text-gray-900 dark:text-gray-100 mb-2 hover:bg-slate-300 focus:bg-slate-300">
      <div className="relative h-24 hidden xs:flex">
        <img
          className="rounded-2xl object-cover"
          src={restaurantImg}
          alt="Picture of the restaurant"
        />
      </div>
      <StoreListRowDetails store={store} />
      <div className="flex flex-col justify-between">
        <StoreListRowSummary />
        {distance && (
          <div className="flex">
            <LocationMarkerIcon className="w-4 h-4 mr-2" />
            <span className="font-semibold">{distance.toFixed(1)} km</span>
          </div>
        )}
        <StoreListRowRating />
      </div>
    </article>
  );
}
