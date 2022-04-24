import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { HomeIcon } from "@heroicons/react/solid";

import { capitalize } from "@lib/strings";

export default function Breadcrumb() {
  const [pages, setPages] = useState([]);
  const { query } = useRouter();

  useEffect(() => {
    setPages(buildPages());
  }, []);

  function buildPages() {
    const paths = window.location.pathname.split("/");
    const _pages = [];
    const queryValues = Object.values(query);

    for (let i = 1; i < paths.length; i++) {
      const pageName = paths[i];
      _pages.push({
        name: queryValues.includes(pageName) ? pageName : capitalize(pageName),
        href: paths.slice(0, i + 1).join("/"),
      });
    }

    return _pages;
  }

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-2">
        <li>
          <div>
            <Link href="/">
              <a className="text-gray-400 hover:text-gray-500">
                <HomeIcon
                  className="flex-shrink-0 h-5 w-5"
                  aria-hidden="true"
                />
              </a>
            </Link>
          </div>
        </li>
        {pages.map((page) => (
          <li key={page.name}>
            <div className="flex items-center">
              <svg
                className="flex-shrink-0 h-5 w-5 text-gray-300"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
              </svg>
              <Link href={page.href}>
                <a className="ml-2 text-sm font-medium text-gray-500 hover:text-gray-700">
                  {page.name}
                </a>
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}
