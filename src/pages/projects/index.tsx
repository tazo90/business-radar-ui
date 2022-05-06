import DashboardLayout from "@components/layouts/dashboard";

import { trpc } from "@lib/trpc";
import Link from "next/link";

import { DotsHorizontalIcon, ViewGridAddIcon } from "@heroicons/react/solid";
import { Menu, Transition } from "@headlessui/react";
import { classNames } from "@lib/classnames";
import { Fragment, useState } from "react";
import router from "next/router";
import showToast from "@lib/notification";
import ProjectModalForm from "@components/projects/project-modal-form";
import { Dialog } from "@components/ui/dialog";

const userAvatar =
  "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";
const users = [...Array(3).fill(userAvatar)];

export default function ProjectsPage() {
  const [addProjectModal, setAddProjectModal] = useState(false);

  const utils = trpc.useContext();
  const { isFetching, data: projects } = trpc.useQuery(["api.project.all"]);

  const deleteProject = trpc.useMutation("api.project.delete", {
    async onSuccess() {
      showToast("Project removed", "success");
      await utils.invalidateQueries(["api.project.all"]);
    },
  });

  const projectActions = [
    {
      name: "Edit",
      href: "#",
      onClick: (slug: string) => router.push(`/projects/${slug}`),
    },
    {
      name: "Delete",
      href: "#",
      onClick: (slug: string) => deleteProject.mutate({ slug }),
    },
  ];

  return (
    <div className="mx-8">
      <div className="flex justify-between">
        <div className="py-4">
          <h1 className="text-xl font-semibold text-gray-700">Projects</h1>
        </div>
        <div className="mt-4 p-2 flex sm:mt-0 sm:ml-0">
          <button
            onClick={() => setAddProjectModal(true)}
            type="button"
            className="order-0 inline-flex items-center px-4 h-9 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-500 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:order-1 sm:ml-3"
          >
            + Create project
          </button>
        </div>
      </div>
      <ul
        role="list"
        className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {projects?.map((project) => (
          <li
            key={project.id}
            className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200"
          >
            <div className="bg-white w-full flex items-center justify-between px-6 py-4 space-x-6 rounded-lg shadow-lg">
              <Link href={`/projects/${project.slug}`}>
                <a className="flex-1 truncate space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-gray-900 text-md font-semibold truncate">
                      {project.name}
                    </h3>
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

                                    item.onClick
                                      ? item.onClick(project.slug)
                                      : null;
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
                  <div className="flex justify-between">
                    <span className="flex-shrink-0 inline-block px-2 py-0.5 text-white text-xs font-medium bg-green-500 rounded-md">
                      Admin
                    </span>
                  </div>
                  <div className="flex">
                    <p className="mt-1 text-gray-500 text-sm truncate">
                      Lorem ipsum feea fdsafdsafd fdsa fdsafdsafdasfdasf fdsaf
                    </p>
                  </div>
                  <div className="flex pt-4">
                    <div className="flex items-center text-gray-500">
                      <ViewGridAddIcon className="h-5 w-5" />
                      <span className="mx-1.5 font-semibold text-gray-600">
                        {/* {project._count.consumers} */}
                      </span>
                      Apps
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 pt-2">
                    {users.map((user, index) => (
                      <img
                        key={index}
                        className="object-cover h-7 w-7 rounded-full"
                        src={user}
                        alt=""
                      />
                    ))}
                    <p className="text-sm font-semibold pl-4">+ 7 more</p>
                  </div>
                </a>
              </Link>
            </div>
            <div></div>
          </li>
        ))}
      </ul>

      {/* Add project dialog */}
      <Dialog
        title="Create new project"
        open={addProjectModal}
        onClose={() => setAddProjectModal(false)}
      >
        <ProjectModalForm onClose={() => setAddProjectModal(false)} />
      </Dialog>
    </div>
  );
}

ProjectsPage.Layout = DashboardLayout;
