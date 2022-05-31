import { ListItemFields } from "@components/listbox/listbox-item/listbox-item-details";
import icons from "@constants/icons";
import { classNames } from "@lib/classnames";

export function ListboxJobDetails({ job, distance, attributes }) {
  return (
    <div
      className={classNames(
        "flex flex-col h-full w-full",
        attributes.includes("image") ? "xs:w-[78%]" : "xs:w-full"
      )}
    >
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
        <ListItemFields
          item={job}
          distance={distance}
          attributes={attributes}
        />
      </div>
    </div>
  );
}
