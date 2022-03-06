import Image from "next/image";
import restaurantImg from "@assets/restaurant.jpg";

import { StoreListRowRating } from "./store-list-row-rating";
import { StoreListRowDetails } from "./store-list-row-details";
import { StoreListRowSummary } from "./store-list-row-summary";

export function StoreListRow({ store, isActive }) {
  return (
    <article className="flex h-36 cursor-pointer border rounded-md p-2 bg-gray-600 text-gray-700 mb-2 hover:border-green-600 focus:outline-none focus:border-green-500">
      <div className="flex relative h-24 w-2/4">
        <Image
          className="rounded-2xl"
          src={restaurantImg}
          alt="Picture of the restaurant"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <StoreListRowDetails store={store} />
      <div className="flex flex-col justify-between text-gray-100 text-xs">
        <StoreListRowSummary />
        <StoreListRowRating />
      </div>
    </article>
  );
}
