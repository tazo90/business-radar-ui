import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { HomeIcon } from "@heroicons/react/outline";

import { classNames } from "@lib/classnames";
import {
  CogIcon,
  DocumentTextIcon,
  ShoppingCartIcon,
  TerminalIcon,
  UserGroupIcon,
  ViewGridIcon,
} from "@heroicons/react/solid";
import { useRouter } from "next/router";

const navigation = [
  { name: "Dashboard", href: "/", icon: HomeIcon },
  {
    name: "Projects",
    href: "/projects",
    icon: ViewGridIcon,
  },
  {
    name: "Applications",
    href: "/apps",
    icon: TerminalIcon,
  },
  {
    name: "Plan & billing",
    href: "/billing",
    icon: DocumentTextIcon,
  },
  {
    name: "Members",
    href: "/members",
    icon: UserGroupIcon,
  },
  { name: "Store", href: "/store", icon: ShoppingCartIcon },
  { name: "Settings", href: "/settings", icon: CogIcon },
];

const applications = [
  { name: "Stores", href: "#", bgColorClass: "bg-indigo-500" },
  { name: "Jobs", href: "#", bgColorClass: "bg-green-500" },
  { name: "Ecommerce", href: "#", bgColorClass: "bg-yellow-500" },
];

export function SidebarDesktop() {
  const { asPath: pathname } = useRouter();

  return (
    <div className="hidden min-h-full lg:flex lg:flex-col lg:w-64 lg:inset-y-0 lg:border-r lg:border-gray-300 lg:pb-4 lg:bg-[#24292f] z-50 shadow-2xl">
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
            {navigation.map((item) => {
              const isActive =
                item.href.length > 1
                  ? pathname.startsWith(item.href)
                  : item.href === pathname;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    isActive
                      ? "bg-[#303740] text-gray-200"
                      : "text-gray-400 hover:text-gray-300 hover:bg-[#303740]",
                    "group flex items-center px-2 py-2 text-sm font-medium rounded-sm"
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  <item.icon
                    className={classNames(
                      isActive
                        ? "text-gray-300"
                        : "text-gray-500 group-hover:text-gray-300",
                      "mr-3 flex-shrink-0 h-5 w-5"
                    )}
                    aria-hidden="true"
                  />
                  {item.name}
                </a>
              );
            })}
          </div>
          <div className="mt-8">
            {/* Secondary navigation */}
            <h3
              className="px-3 text-xs font-semibold text-gray-300 uppercase tracking-wider"
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
                  className="group flex items-center px-3 py-2 text-sm font-medium text-gray-400 rounded-md hover:text-gray-900 hover:bg-gray-50"
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
        <div className="flex items-center mt-12 ml-6">
          <img
            src="https://download.logo.wine/logo/AmRest/AmRest-Logo.wine.png"
            className="h-12 object-cover bg-gray-100 rounded-sm"
          />
        </div>
      </div>
    </div>
  );
}
