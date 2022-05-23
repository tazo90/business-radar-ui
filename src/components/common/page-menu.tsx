import { classNames } from "@lib/classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import { subst } from "urlcat";

type MenuItem = {
  name: string;
  href: string;
  icon?: React.ReactNode;
  disabled?: boolean;
};

type PageMenuProps = {
  menu: MenuItem[];
  header: React.ReactNode;
  fullScreen?: boolean;
};

export default function PageMenu(props: PageMenuProps) {
  const { query = {}, ...router } = useRouter();
  const currentPage = router.pathname
    .split("/")
    .slice(-1)[0]
    .replace("[", "")
    .replace("]", "");

  return (
    <aside
      className={classNames(
        props.fullScreen ? "py-3" : "",
        "px-2 lg:col-span-2 bg-gray-100 border-r border-gray-200"
      )}
    >
      {props.header && (
        <h1 className="px-2 pb-4 text-gray-600 font-semibold">
          {props.header}
        </h1>
      )}
      <nav className="space-y-1">
        {props.menu.map((item) => {
          const page = item.href.split("/").slice(-1)[0].replace(":", "");
          const isActive = currentPage === page;
          const link =
            Object.keys(query).length === 0
              ? item.href
              : subst(item.href, query);

          return (
            <Link key={item.name} href={link}>
              <a
                className={classNames(
                  isActive
                    ? "bg-gray-300 text-gray-900"
                    : "text-gray-600 hover:text-gray-700 hover:bg-gray-200",
                  item.disabled ? "opacity-50" : "",
                  "group rounded-sm px-3 py-2 flex items-center text-sm font-medium"
                )}
              >
                <item.icon
                  className={classNames(
                    isActive ? "text-gray-800" : "text-gray-500",
                    "flex-shrink-0 -ml-1 mr-3 h-5 w-5"
                  )}
                  aria-hidden="true"
                />
                <span className="truncate">{item.name}</span>
              </a>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
