import Button from "@components/ui/button";
import DashboardLayout from "@components/layouts/dashboard";

import {
  BookOpenIcon,
  DocumentTextIcon,
  LocationMarkerIcon,
  ShoppingCartIcon,
  StarIcon,
  UsersIcon,
} from "@heroicons/react/solid";

const apps = [
  {
    id: "stores",
    title: "Stores",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    icon: <LocationMarkerIcon className="h-4 w-4" />,
    img: '"https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";',
  },
  {
    id: "jobs",
    title: "Jobs",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    disabled: true,
    icon: <DocumentTextIcon className="h-4 w-4" />,
    img: '"https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";',
  },
  {
    id: "ecommerce",
    title: "ECommerce",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    disabled: true,
    icon: <ShoppingCartIcon className="h-4 w-4" />,
    img: '"https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";',
  },
  {
    id: "trainings",
    title: "Trainings",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    disabled: true,
    icon: <BookOpenIcon className="h-4 w-4" />,
    img: '"https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";',
  },
  {
    id: "employees",
    title: "Employees",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    disabled: true,
    icon: <UsersIcon className="h-4 w-4" />,
    img: '"https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";',
  },
  {
    id: "reviews",
    title: "Reviews",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    disabled: true,
    icon: <StarIcon className="h-4 w-4" />,
    img: '"https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";',
  },
];

export default function MarketplacePage() {
  return (
    <div className="mx-8">
      <div className="flex justify-between">
        <div className="py-4">
          <h1 className="text-xl font-semibold text-gray-700">Marketplace</h1>
        </div>
      </div>
      <ul
        role="list"
        className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {apps?.map((app) => {
          const Icon = app.icon;
          return (
            <li
              key={app.id}
              className={`col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200 ${
                app.disabled ? "opacity-50 cursor" : ""
              }`}
            >
              <div className="bg-white w-full flex items-center justify-between px-6 py-4 space-x-6 rounded-lg shadow-lg">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center justify-center">
                      <div className="flex p-2 text-gray-900 text-xs font-medium bg-yellow-400 rounded-md">
                        {app.icon}
                      </div>
                      <h3 className="ml-2 text-gray-900 text-md font-semibold truncate">
                        {app.title}
                      </h3>
                    </div>
                    {!app.disabled && (
                      <div className="flex justify-end">
                        <Button type="button" color="main" tabIndex={-1}>
                          Install
                        </Button>
                      </div>
                    )}
                  </div>

                  <div className="relative flex flex-col space-y-2">
                    {app.disabled && (
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 p-2 rounded-md">
                        <p className="font-bold text-md text-white ">
                          Coming soon
                        </p>
                      </div>
                    )}

                    <div className="flex w-full">
                      <img
                        src="https://digital-geography.com/wp-content/uploads/2016/05/1-2.png"
                        className="object-cover w-1/2 h-1/2"
                      />
                      <p className="ml-4 text-sm text-gray-700">
                        {app.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div></div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

MarketplacePage.Layout = DashboardLayout;
