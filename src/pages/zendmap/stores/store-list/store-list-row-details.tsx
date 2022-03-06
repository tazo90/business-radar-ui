import { icons } from "../../../../constants";

import Image from "next/image";

export function StoreListRowDetails({ store }) {
  return (
    <div className="flex flex-col h-full w-full mx-2">
      <div className="flex items-center pl-3 pr-4 min-h-fit w-fit rounded-3xl bg-gray-100">
        <div className="flex relative h-7 w-7">
          <Image
            src={icons.amrest.markers[store.brand]}
            alt="Picture of the restaurant"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="flex flex-col items-center ml-2 py-0.5">
          <span className="text-sm font-semibold leading-none">
            {store.brand.toUpperCase()}
          </span>
          <span className="text-sm leading-none">{store.name}</span>
        </div>
        <div className="relative bottom-2 left-1 w-2 h-2 rounded-full bg-green-700"></div>
      </div>
      <div className="text-gray-100 text-[0.82rem] leading-snug pt-1">
        <p>
          <span className="font-bold">Address:</span> {store.address}
        </p>
        <p>
          <span className="font-bold">Phone:</span> {store.phone}
        </p>
        <p>
          <span className="font-bold">Hours:</span> 08:00 - 16:00
        </p>
      </div>
    </div>
  );
}
