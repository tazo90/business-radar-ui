
import { Fragment } from "react";
import Link from "next/link";
import { Menu, Transition } from "@headlessui/react";
import { DotsHorizontalIcon, LocationMarkerIcon } from "@heroicons/react/solid";

import DashboardLayout from "@components/layouts/dashboard";
import apps from "apps/index";
import { classNames } from "@lib/classnames";
import { trpc } from "@lib/trpc";
import { capitalize } from "@lib/strings";
import showToast from "@lib/notification";

export default function AppsPage() {
  const { data } = trpc.useQuery(['api.application.all', {}]);
  const utils = trpc.useContext();

  const deleteApp = trpc.useMutation("api.application.delete", {
    async onSuccess() {
      showToast("Uninstalled app", "success");
      await utils.invalidateQueries(["api.application.all"]);
    },
  });

  const projectActions = [
    {
      name: "Uninstall",
      href: "#",
      onClick: (id: number) => deleteApp.mutate({ id }),
    },
  ];

  return (
    <div className="mx-8">
      <div className="flex justify-between">
        <div className="py-4">
          <h1 className="text-xl font-semibold text-gray-700">
            Your applications
          </h1>
        </div>
      </div>
      <ul
        role="list"
        className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {data?.map((app) => (
          <li
            key={app.id}
            className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200"
          >
            <div className="bg-white w-full flex items-center justify-between px-6 py-4 space-x-6 rounded-lg shadow-lg">
              <Link href={`/apps/${app.type.toLowerCase()}`}>
                <a className="flex-1 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center justify-center">
                      <div className="flex p-2 text-gray-900 text-xs font-medium bg-yellow-400 rounded-md">
                        <LocationMarkerIcon className="h-4 w-4" />
                      </div>
                      <h3 className="ml-2 text-gray-900 text-md font-semibold truncate">
                        {capitalize(app.type)}
                      </h3>
                    </div>
                    <Menu as="div" className="flex-shrink-0 relative ml-5">
                      <Menu.Button className="p-1 bg-gray-100 rounded-full flex focus:outline-none">
                        <DotsHorizontalIcon className="h-5 w-5" />
                      </Menu.Button>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="origin-top-right absolute z-10 right-1 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 focus:outline-none">
                          {projectActions.map((item) => (
                            <Menu.Item key={item.name}>
                              {({ active }) => (
                                <a
                                  href={item.href}
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block py-2 px-4 text-sm text-gray-700"
                                  )}
                                  onClick={(e) => {
                                    e.preventDefault();

                                    item.onClick ? item.onClick(app.id) : null;
                                  }}
                                >
                                  {item.name}
                                </a>
                              )}
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>

                  <div className="relative flex flex-col space-y-2">
                    <div className="flex w-full">
                      <img
                        src="https://digital-geography.com/wp-content/uploads/2016/05/1-2.png"
                        className="object-cover w-1/2 h-1/2"
                      />
                      <p className="ml-4 text-sm text-gray-700">
                        {apps[app.type.toLowerCase()].description}
                      </p>
                    </div>

                    <div className="flex items-center space-x-2 pt-2">
                      <p className="text-sm font-semibold">Consumers: </p>
                      <span className="text-sm">{app._count.consumers}</span>
                    </div>
                  </div>
                </a>
              </Link>
            </div>
            <div></div>
          </li>
        ))}
      </ul>
    </div>
  );
}

AppsPage.Layout = DashboardLayout;
