import DashboardLayout from "@components/layouts/dashboard";

import Link from "next/link";

import { DotsHorizontalIcon, LocationMarkerIcon } from "@heroicons/react/solid";
import { Menu, Transition } from "@headlessui/react";
import { classNames } from "@lib/classnames";
import { Fragment } from "react";

const apps = [
  {
    id: "stores",
    title: "Stores",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    integrations: 10,
    img: '"https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";',
  },
];

export default function AppsPage() {
  const projectActions = [
    {
      name: "Delete",
      href: "#",
      // onClick: (slug: string) => deleteProject.mutate({ slug }),
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
        {apps?.map((app) => (
          <li
            key={app.id}
            className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200"
          >
            <div className="bg-white w-full flex items-center justify-between px-6 py-4 space-x-6 rounded-lg shadow-lg">
              <Link href={`/apps/${app.id}`}>
                <a className="flex-1 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center justify-center">
                      <div className="flex p-2 text-gray-900 text-xs font-medium bg-yellow-400 rounded-md">
                        <LocationMarkerIcon className="h-4 w-4" />
                      </div>
                      <h3 className="ml-2 text-gray-900 text-md font-semibold truncate">
                        {app.title}
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
                        {app.description}
                      </p>
                    </div>

                    <div className="flex items-center space-x-2 pt-2">
                      <p className="text-sm font-semibold">Integrations: </p>
                      <span className="text-sm">{app.integrations}</span>
                    </div>
                  </div>
                </a>
              </Link>
            </div>
            <div></div>
          </li>
        ))}
      </ul>

      {/* Add project dialog */}
      {/* <Dialog
        title="Create new project"
        open={addProjectModal}
        onClose={() => setAddProjectModal(false)}
      >
        <ProjectModalForm onClose={() => setAddProjectModal(false)} />
      </Dialog> */}
    </div>
  );
}

AppsPage.Layout = DashboardLayout;
