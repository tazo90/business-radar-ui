import { MapIcon } from "@heroicons/react/outline";

export function MapButton() {
  return (
    <button className="flex justify-center lg:hidden items-center fixed z-50 bottom-[20%] left-[45%] w-24 h-8 bg-black text-white rounded-full">
      <MapIcon className="h-6 w-6" aria-hidden="true" />
      <span className="pl-2 text-xs">Map</span>
    </button>
  );
}
