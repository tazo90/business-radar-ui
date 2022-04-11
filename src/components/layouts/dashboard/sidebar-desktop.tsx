import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ClockIcon, HomeIcon, ViewListIcon } from "@heroicons/react/outline";

import { classNames } from "@lib/classnames";

const navigation = [
  { name: "Dashboard", href: "#", icon: HomeIcon, current: true },
  { name: "Applications", href: "#", icon: ViewListIcon, current: false },
  { name: "Settings", href: "#", icon: ClockIcon, current: false },
];
const applications = [
  { name: "Stores", href: "#", bgColorClass: "bg-indigo-500" },
  { name: "Jobs", href: "#", bgColorClass: "bg-green-500" },
  { name: "Ecommerce", href: "#", bgColorClass: "bg-yellow-500" },
];

export function SidebarDesktop() {
  return (
    <div className="hidden lg:flex lg:flex-col lg:w-64 lg:inset-y-0 lg:border-r lg:border-gray-300 lg:pb-4 lg:bg-gray-100">
      {/* Sidebar component, swap this element with another sidebar if you like */}
      <div className="h-0 flex-1 flex flex-col overflow-y-auto">
        {/* User account dropdown */}
        <Menu as="div" className="px-3 relative inline-block text-left">
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="z-10 mx-3 origin-top absolute right-0 left-0 mt-1 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none">
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      View profile
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      Settings
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      Notifications
                    </a>
                  )}
                </Menu.Item>
              </div>
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      Get desktop app
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      Support
                    </a>
                  )}
                </Menu.Item>
              </div>
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      Logout
                    </a>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
        {/* Navigation */}
        <nav className="px-3 mt-2.5">
          <div className="space-y-1">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={classNames(
                  item.current
                    ? "bg-gray-300 text-gray-900"
                    : "text-gray-700 hover:text-gray-900 hover:bg-gray-50",
                  "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                )}
                aria-current={item.current ? "page" : undefined}
              >
                <item.icon
                  className={classNames(
                    item.current
                      ? "text-gray-700"
                      : "text-gray-500 group-hover:text-gray-500",
                    "mr-3 flex-shrink-0 h-6 w-6"
                  )}
                  aria-hidden="true"
                />
                {item.name}
              </a>
            ))}
          </div>
          <div className="mt-8">
            {/* Secondary navigation */}
            <h3
              className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider"
              id="desktop-teams-headline"
            >
              Applications
            </h3>
            <div
              className="mt-1 space-y-1"
              role="group"
              aria-labelledby="desktop-teams-headline"
            >
              {applications.map((team) => (
                <a
                  key={team.name}
                  href={team.href}
                  className="group flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:text-gray-900 hover:bg-gray-50"
                >
                  <span
                    className={classNames(
                      team.bgColorClass,
                      "w-2.5 h-2.5 mr-4 rounded-full"
                    )}
                    aria-hidden="true"
                  />
                  <span className="truncate">{team.name}</span>
                </a>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
