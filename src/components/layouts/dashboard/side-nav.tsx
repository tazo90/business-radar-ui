import {
  CollectionIcon,
  AcademicCapIcon,
  LibraryIcon,
} from "@heroicons/react/solid";

export function SideNav() {
  return (
    <nav
      aria-label="side bar"
      aria-orientation="vertical"
      className="flex-col z-50 hidden lg:flex items-center text-center bg-gray-700 text-gray-400"
    >
      <div className="h-12 flex items-center w-full">
        <img
          className="h-6 w-6 mx-auto"
          src="https://raw.githubusercontent.com/bluebrown/tailwind-zendesk-clone/master/public/assets/leaves.png"
        />
      </div>
      <ul>
        <li>
          <a
            title="Stores"
            href="/stores"
            className="h-16 px-2 flex flex-col items-center justify-center text-white bg-slate-500 w-full border-b border-gray-600"
          >
            <i className="mx-auto pb-1">
              <LibraryIcon className="h-6 w-6" aria-hidden="true" />
            </i>
            <span className="text-xs">Stores</span>
          </a>
        </li>
        <li>
          <a
            title="Jobs"
            href="/jobs"
            className="h-16 px-2 flex flex-col items-center justify-center hover:text-white w-full border-b border-gray-600"
          >
            <i className="mx-auto pb-1">
              <CollectionIcon className="h-6 w-6" aria-hidden="true" />
            </i>
            <span className="text-xs">Job offers</span>
          </a>
        </li>
        <li>
          <a
            title="Trainings"
            href="/trainings"
            className="h-16 px-2 flex flex-col items-center justify-center hover:text-white w-full border-b border-gray-600"
          >
            <i className="mx-auto pb-1">
              <AcademicCapIcon className="w-6 h-6" aria-label="true" />
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
