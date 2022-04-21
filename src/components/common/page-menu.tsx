import {
  CreditCardIcon,
  KeyIcon,
  UserCircleIcon,
  UserGroupIcon,
  ViewGridAddIcon,
  CogIcon,
} from "@heroicons/react/outline";
import { classNames } from "@lib/classnames";

const navigation = [
  { name: "Applications", href: "#", icon: ViewGridAddIcon, current: true },
  { name: "Plan & Billing", href: "#", icon: CreditCardIcon, current: false },
  { name: "Team", href: "#", icon: UserGroupIcon, current: false },
  { name: "Settings", href: "#", icon: CogIcon, current: false },
];

export default function PageMenu() {
  return (
    <aside className="py-6 px-2 sm:px-6 lg:p-2 lg:col-span-2">
      <nav className="space-y-1">
        {navigation.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className={classNames(
              item.current
                ? "bg-gray-200 text-indigo-700 hover:text-indigo-700 hover:bg-gray-200"
                : "text-gray-900 hover:text-gray-900 hover:bg-gray-50",
              "group rounded-md px-3 py-2 flex items-center text-sm font-medium"
            )}
          >
            <item.icon
              className={classNames(
                item.current
                  ? "text-indigo-500 group-hover:text-indigo-500"
                  : "text-gray-400 group-hover:text-gray-500",
                "flex-shrink-0 -ml-1 mr-3 h-6 w-6"
              )}
              aria-hidden="true"
            />
            <span className="truncate">{item.name}</span>
          </a>
        ))}
      </nav>
    </aside>
  );
}
