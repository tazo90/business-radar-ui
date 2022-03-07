import Image from "next/image";
import restaurantImg from "@assets/restaurant.jpg";

import { StoreListRowRating } from "./store-list-row-rating";
import { StoreListRowDetails } from "./store-list-row-details";
import { StoreListRowSummary } from "./store-list-row-summary";

export function StoreListRow({ store, isActive }) {
  return (
    <article className="flex h-36 cursor-pointer border border-gray-500 rounded-md py-2 px-3 bg-gray-100 dark:bg-gray-600 text-xs text-gray-900 dark:text-gray-100 mb-2 hover:border-gray-900 focus:outline-none focus:border-gray-900">
      <div className="flex relative h-24 w-2/4 md:w-2/6">
        <Image
          className="rounded-2xl"
          src={restaurantImg}
          alt="Picture of the restaurant"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <StoreListRowDetails store={store} />
      <div className="flex flex-col justify-between">
        <StoreListRowSummary />
        <StoreListRowRating />
      </div>
    </article>
  );
}
