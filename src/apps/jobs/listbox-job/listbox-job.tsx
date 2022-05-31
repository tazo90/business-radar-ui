import restaurantImg from "@assets/restaurant.jpg";

import { ListboxJobDetails } from "./listbox-job-details";

export function ListboxJob({ item, distance, isActive }) {
  return (
    <article className="flex drop-shadow-lg justify-between h-30 cursor-pointer border border-gray-500 rounded-md p-2 bg-gray-600 dark:bg-gray-600 text-xs text-gray-100 dark:text-gray-100 mb-2 hover:bg-gray-700 focus:bg-slate-300">
      <div className="relative h-24 min-w-[20%] max-w-[20%] hidden xs:flex">
        <img
          className="rounded-2xl object-cover"
          src={restaurantImg}
          alt="Picture of the restaurant"
        />
      </div>
      <ListboxJobDetails job={item} distance={distance} />
    </article>
  );
}
