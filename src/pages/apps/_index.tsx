import DashboardLayout from "@components/layouts/dashboard";

import { trpc } from "@lib/trpc";
import Link from "next/link";

import {
  CheckCircleIcon,
  DotsHorizontalIcon,
  LocationMarkerIcon,
  ViewGridAddIcon,
} from "@heroicons/react/solid";
import { Menu, Transition } from "@headlessui/react";
import { classNames } from "@lib/classnames";
import { Fragment, useState } from "react";
import router from "next/router";
import showToast from "@lib/notification";
import ProjectModalForm from "@components/projects/project-modal-form";
import { Dialog } from "@components/ui/dialog";
import icons from "@constants/icons";
import { capitalize } from "@lib/strings";

const userAvatar =
  "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";
const users = [...Array(3).fill(userAvatar)];

export default function AppsPage() {
  const [addApplicationModal, setAddApplicationModal] = useState(false);

  const utils = trpc.useContext();
  const { isFetching, data: apps } = trpc.useQuery([
    "api.application.all",
    { organizationSlug: "amrest" },
  ]);

  // const deleteProject = trpc.useMutation("api.application.delete", {
  //   async onSuccess() {
  //     showToast("Project removed", "success");
  //     await utils.invalidateQueries(["api.project.all"]);
  //   },
  // });

  const projectActions = [
    {
      name: "Edit",
      href: "#",
      onClick: (slug: string) => router.push(`/projects/${slug}`),
    },
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
          <h1 className="text-xl font-semibold text-gray-700">Applications</h1>
        </div>
        <div className="mt-4 p-2 flex sm:mt-0 sm:ml-0">
          <button
            // onClick={() => setAddProjectModal(true)}
            type="button"
            className="order-0 inline-flex items-center px-4 h-9 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-500 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:order-1 sm:ml-3"
          >
            + Create application
          </button>
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
              <Link href={`/apps/${app.uid}`}>
                <a className="flex-1 truncate space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center justify-between">
                      <div className="flex py-1 px-2 text-gray-900 text-xs font-medium bg-yellow-400 rounded-md">
                        <LocationMarkerIcon className="h-4 w-4" />
                        <span className="text-xs ml-1">
                          {capitalize(app.type)}
                        </span>
                      </div>
                      <h3 className="ml-3 text-gray-900 text-md font-semibold truncate">
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

                                    item.onClick ? item.onClick(app.uid) : null;
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

                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="flex-shrink-0 inline-block px-2 py-0.5 text-white text-xs font-medium bg-green-500 rounded-md">
                        Project: {app.project?.name}
                      </p>
                      <p className="text-xs">Expires: 2022-12-03</p>
                    </div>

                    <div className="flex items-center space-x-2 pt-2">
                      <p className="text-sm">Used by:</p>
                      <p className="text-sm font-medium text-lime-600 truncate">
                        {app.domain.replace("https://", "")}
                      </p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <p className="text-sm">Brands:</p>
                      <div className="flex flex-shrink-0 -space-x-1">
                        {app?.brands.map((brand) => (
                          <img
                            key={brand.id}
                            className="max-w-none h-6 w-6 rounded-full ring-2 ring-white"
                            src={icons.amrest.brands[brand.name.toLowerCase()]}
                            alt={brand.name}
                          />
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <p className="text-sm">Countries: </p>
                        {app.countries.map((country) => (
                          <img
                            key={country.id}
                            className="max-w-none h-6 w-6 ring-2 ring-white"
                            src={icons.flags[country.code.toLowerCase()]}
                            alt={country.code}
                          />
                        ))}
                      </div>
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
