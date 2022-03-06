import countries from "../../../constants/countries";

export function CountryFilter() {
  return (
    <section
      aria-label="ticket-statistics-tabs-label"
      className="flex flex-col items-center justify-center pt-1 pb-2 pr-4 mr-4 focus:outline-none w-3/5 overflow-x-auto"
    >
      <ul className="flex pt-1 px-2 rounded-md bg-gray-100">
        <li>
          <span>Countries</span>
        </li>
        {countries.map((country, index) => (
          <li key={index}>
            <button className="px-1 rounded-full flex flex-col items-center justify-between">
              <img
                className="object-cover rounded-full h-[30px] w-[30px]"
                src={country.img}
              />
              <span className="text-xs font-semibold text-gray-500 pt-1">
                {country.value.toUpperCase()}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
