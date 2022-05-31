import { Rating } from "@components/ui/rating";
import icons from "@constants/icons";
import { LocationMarkerIcon } from "@heroicons/react/solid";
import { classNames } from "@lib/classnames";

export const AddressField = ({ address }) => (
  <p className="truncate">
    <span className="font-bold">Address:</span> {address}
  </p>
);

export const PhoneField = ({ phone, distance }) => (
  <div
    className={classNames("flex", phone ? "justify-between" : "justify-end")}
  >
    {phone && (
      <p>
        <span className="font-bold">Phone:</span> {phone}
      </p>
    )}
    {distance && (
      <div className="flex items-center justify-end">
        <LocationMarkerIcon className="w-3 h-3 mr-0.5" />
        <span className="text-xs">{distance.toFixed(1)} km</span>
      </div>
    )}
  </div>
);

export const HoursRateReviewsField = ({ hours, attributes }) => (
  <div className="flex justify-between">
    <p>
      <span className="font-bold">Hours:</span> {hours} -{" "}
      <span className="font-semibold text-green-500">Open</span>
    </p>
    {attributes.includes("rate") && (
      <Rating
        withReviews={attributes.includes("reviews")}
        count={120}
        rate={3.6}
        stars={1}
        textSize="text-xs"
      />
    )}
  </div>
);

export function ListItemFields({ item, distance, attributes }) {
  const fields = {
    address: <AddressField address={item.address} />,
    phone: <PhoneField phone={item.phone} distance={distance} />,
    opening_hours: (
      <HoursRateReviewsField hours="08:00 - 16:00" attributes={attributes} />
    ),
  };

  return attributes.map(
    (attribute) => attribute in fields && fields[attribute]
  );
}

export function ListboxItemDetails({ item, distance, attributes }) {
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
            src={icons.amrest.markers[item.brand]}
            alt="Picture of the restaurant"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col items-center ml-2 pt-0.5 text-[0.82rem] overflow-hidden">
          <span className="relative font-semibold leading-none">
            {item.brand_full.toUpperCase()}
          </span>
          <span className="pb-0.5 leading-1 w-full truncate">{item.name}</span>
        </div>
        <div className="flex relative bottom-1.5 right-0 w-2 h-2 rounded-full bg-green-600"></div>
      </div>
      <div className="text-[0.82rem] leading-snug pt-2 space-y-0.5">
        <ListItemFields
          item={item}
          distance={distance}
          attributes={attributes}
        />
      </div>
    </div>
  );
}
