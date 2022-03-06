import { icons } from "../../../../constants";

export function BrandFilter() {
  return (
    <section
      aria-label="open-tickets-tabs-label"
      className="flex flex-col items-center justify-center pt-1 pb-2 pr-4 border border-r-2 mr-4 focus:outline-none w-2/5"
    >
      <ul className="flex pt-1 px-2 rounded-md bg-gray-100">
        <li>
          <span>Brands</span>
        </li>
        {Object.keys(icons.amrest.brands).map((key, index) => (
          <li key={index}>
            <button className="px-1 rounded-full flex flex-col items-center justify-between">
              <img
                className="object-cover h-[30px]"
                src={icons.amrest.brands[key]}
              />
              <span className="text-xs font-semibold text-gray-500 pt-1">
                {key.toUpperCase()}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
