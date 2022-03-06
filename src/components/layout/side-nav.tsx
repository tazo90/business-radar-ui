export function SideNav() {
  return (
    <nav
      aria-label="side bar"
      aria-orientation="vertical"
      className="flex-none flex flex-col items-center text-center bg-gray-700 text-gray-400"
    >
      <div className="h-14 flex items-center w-full">
        <img
          className="h-6 w-6 mx-auto"
          src="https://raw.githubusercontent.com/bluebrown/tailwind-zendesk-clone/master/public/assets/leaves.png"
        />
      </div>
      <ul>
        <li>
          <a
            title="Home"
            href="#home"
            className="h-16 px-2 flex flex-col items-center justify-center text-white bg-slate-500 w-full border-b border-gray-600"
          >
            <i className="mx-auto pb-1">
              <svg
                className="fill-current h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M12 6.453l9 8.375v9.172h-6v-6h-6v6h-6v-9.172l9-8.375zm12 5.695l-12-11.148-12 11.133 1.361 1.465 10.639-9.868 10.639 9.883 1.361-1.465z" />
              </svg>
            </i>
            <span className="text-xs">Stores</span>
          </a>
        </li>
        <li>
          <a
            title="Views"
            href="#views"
            className="h-16 px-2 flex flex-col items-center justify-center hover:text-white w-full border-b border-gray-600"
          >
            <i className="mx-auto pb-1">
              <svg
                className="fill-current h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M18.546 3h-13.069l-5.477 8.986v9.014h24v-9.014l-5.454-8.986zm-3.796 12h-5.5l-2.25-3h-4.666l4.266-7h10.82l4.249 7h-4.669l-2.25 3zm-9.75-4l.607-1h12.787l.606 1h-14zm12.18-3l.607 1h-11.573l.607-1h10.359zm-1.214-2l.606 1h-9.144l.607-1h7.931z" />
              </svg>
            </i>
            <span className="text-xs">Job offers</span>
          </a>
        </li>
        <li>
          <a
            title="Customer Lists"
            href="#customer-lists"
            className="h-16 px-2 flex flex-col items-center justify-center hover:text-white w-full border-b border-gray-600"
          >
            <i className="mx-auto pb-1">
              <svg
                className="fill-current h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M19 7.001c0 3.865-3.134 7-7 7s-7-3.135-7-7c0-3.867 3.134-7.001 7-7.001s7 3.134 7 7.001zm-1.598 7.18c-1.506 1.137-3.374 1.82-5.402 1.82-2.03 0-3.899-.685-5.407-1.822-4.072 1.793-6.593 7.376-6.593 9.821h24c0-2.423-2.6-8.006-6.598-9.819z" />
              </svg>
            </i>
            <span className="text-xs">Trainings</span>
          </a>
        </li>
      </ul>
      <div className="mt-auto h-16 flex items-center w-full">
        <img
          style={{ filter: "invert(85%)" }}
          className="h-8 w-10 mx-auto"
          src="https://raw.githubusercontent.com/bluebrown/tailwind-zendesk-clone/master/public/assets/chi.png"
        />
      </div>
    </nav>
  );
}
