import { SearchIcon } from "@heroicons/react/outline";

export function TopNav() {
  return (
    <nav
      aria-label="top bar"
      className="flex-none flex items-center justify-between bg-gray-700 h-12"
    >
      {/* <!-- top bar left --> */}
      <span
        aria-label="top bar left"
        aria-orientation="horizontal"
        className="text-lg font-semibold text-white pl-5"
      >
        Business Radar
      </span>
      {/* <!-- to bar right  --> */}
      <ul
        aria-label="top bar right"
        aria-orientation="horizontal"
        className="px-8 flex items-center"
      >
        <li className="relative">
          <input
            title="Search Bar"
            aria-label="search bar"
            role="search"
            className="pr-8 pl-4 h-8 rounded-md cursor-pointer transition-all duration-300 ease-in-out focus:border-black focus:cursor-text w-4 focus:w-64 placeholder-transparent focus:placeholder-gray-500"
            type="text"
            placeholder="Search Chi Desk Support"
          />
          <i className="pointer-events-none absolute top-0 right-0 h-full flex items-center pr-3">
            <SearchIcon className="h-4 w-4" aria-hidden="true" />
          </i>
        </li>
        <li className="h-8 w-8 ml-3">
          <button
            title="Notifications"
            aria-label="notifications"
            className="w-full h-full text-white bg-gray-600 rounded-md focus:outline-none focus:shadow-outline"
          >
            <i>
              <svg
                className="fill-current w-4 h-4 mx-auto"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M15.137 3.945c-.644-.374-1.042-1.07-1.041-1.82v-.003c.001-1.172-.938-2.122-2.096-2.122s-2.097.95-2.097 2.122v.003c.001.751-.396 1.446-1.041 1.82-4.667 2.712-1.985 11.715-6.862 13.306v1.749h20v-1.749c-4.877-1.591-2.195-10.594-6.863-13.306zm-3.137-2.945c.552 0 1 .449 1 1 0 .552-.448 1-1 1s-1-.448-1-1c0-.551.448-1 1-1zm3 20c0 1.598-1.392 3-2.971 3s-3.029-1.402-3.029-3h6z" />
              </svg>
            </i>
          </button>
        </li>
        <li className="h-8 w-8 ml-3">
          <button
            title="Page Menu"
            aria-label="page menu"
            className="h-full w-full rounded-full border focus:outline-none focus:shadow-outline"
          >
            <img
              className="h-full w-full rounded-full mx-auto"
              src="https://raw.githubusercontent.com/bluebrown/tailwind-zendesk-clone/master/public/assets/me.jpg"
            />
          </button>
        </li>
      </ul>
    </nav>
  );
}
