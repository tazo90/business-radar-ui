import restaurantImg from "@assets/restaurant.jpg";
import { classNames } from "@lib/classnames";

import { ListboxItemDetails } from "./listbox-item-details";

export function ListboxItem({ item, distance, isActive, listview }) {
  const { colors } = listview;
  return (
    <article
      className={classNames(
        "flex drop-shadow-lg justify-between h-30 cursor-pointer border border-gray-500 rounded-md p-2 dark:bg-gray-600 text-xs dark:text-gray-100 mb-2 focus:bg-slate-300",
        listview.colors?.bg ? `bg-[${colors.bg}]` : "bg-gray-600",
        listview.colors?.hoverBg
          ? `hover:bg-[${colors.hoverBg}]`
          : "hover:bg-gray-700",
        listview.colors?.text ? `text-[${colors.text}]` : "text-gray-100"
      )}
    >
      {listview.attributes.includes("image") && (
        <div className="relative h-24 min-w-[20%] max-w-[20%] hidden xs:flex">
          <img
            className="rounded-2xl object-cover"
            src={restaurantImg}
            alt="Picture of the restaurant"
          />
        </div>
      )}
      <ListboxItemDetails
        item={item}
        distance={distance}
        attributes={listview.attributes}
      />
    </article>
  );
}
