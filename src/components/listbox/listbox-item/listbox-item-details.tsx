import icons from "@constants/icons";

export function ListboxItemDetails({ item }) {
  return (
    <div className="flex flex-col h-full w-full ml:0 xs:ml-3 mr-3">
      <div className="flex items-center justify-between relative pl-3 pr-4 min-h-fit w-full rounded-3xl bg-white dark:bg-gray-100 text-gray-900 dark:text-gray-800">
        <div className="flex relative h-7 w-7">
          <img
            src={icons.amrest.markers[item.brand]}
            alt="Picture of the restaurant"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col items-center ml-2 py-0.5 overflow-hidden">
          <span className="text-sm font-semibold leading-none">
            {item.brand_full.toUpperCase()}
          </span>
          <span className="text-sm leading-1 w-full truncate">{item.name}</span>
        </div>
        <div className="flex relative bottom-1.5 right-0 w-2 h-2 rounded-full bg-green-600"></div>
      </div>
      <div className="text-[0.82rem] leading-snug pt-1">
        <p>
          <span className="font-bold">Address:</span> {item.address}
        </p>
        <p>
          <span className="font-bold">Phone:</span> {item.phone}
        </p>
        <p>
          <span className="font-bold">Hours:</span> 08:00 - 16:00 -{" "}
          <span className="font-semibold text-green-500">Open</span>
        </p>
      </div>
    </div>
  );
}
