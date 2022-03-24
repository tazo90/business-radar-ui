import restaurantImg from "../../../assets/restaurant.jpg";

import { ListboxJobDetails } from "./listbox-job-details";

export function ListboxJob({ item, distance, isActive }) {
  return (
    <article className="flex drop-shadow-lg justify-between h-32 cursor-pointer border border-gray-500 rounded-md py-2 px-3 bg-gray-100 dark:bg-gray-600 text-xs text-gray-900 dark:text-gray-100 mb-2 hover:bg-slate-300 focus:bg-slate-300">
      <div className="relative h-24 hidden xs:flex">
        <img
          className="rounded-2xl object-cover"
          src={restaurantImg}
          alt="Picture of the restaurant"
        />
      </div>
      <ListboxJobDetails job={item} />
    </article>
  );
}
