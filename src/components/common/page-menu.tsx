import { classNames } from "@lib/classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import { subst } from "urlcat";

export default function PageMenu({ menu }) {
  const { query, ...router } = useRouter();
  const currentPage = router.pathname
    .split("/")
    .slice(-1)[0]
    .replace("[", "")
    .replace("]", "");

  if (Object.keys(query).length === 0) {
    return null;
  }

  return (
    <aside className="py-6 px-2 sm:px-6 lg:p-2 lg:col-span-2 bg-gray-50">
      <nav className="space-y-1">
        {menu.map((item) => {
          const page = item.href.split("/").slice(-1)[0].replace(":", "");
          const isActive = currentPage === page;
          console.log("PAGE", page, currentPage, isActive, router);
          return (
            <Link key={item.name} href={subst(item.href, query)}>
              <a
                className={classNames(
                  isActive
                    ? "bg-gray-200 text-indigo-700 hover:text-indigo-700 hover:bg-gray-200"
                    : "text-gray-900 hover:text-gray-900 hover:bg-gray-50",
                  "group rounded-md px-3 py-2 flex items-center text-sm font-medium"
                )}
              >
                <item.icon
                  className={classNames(
                    isActive
                      ? "text-indigo-500 group-hover:text-indigo-500"
                      : "text-gray-400 group-hover:text-gray-500",
                    "flex-shrink-0 -ml-1 mr-3 h-6 w-6"
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
