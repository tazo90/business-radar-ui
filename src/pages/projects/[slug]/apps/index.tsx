import DashboardLayout from "@components/layouts/dashboard";
import { trpc } from "@lib/trpc";
import Link from "next/link";
import { useRouter } from "next/router";
import icons from "@constants/icons";

import {
  CheckCircleIcon,
  ClipboardCopyIcon,
  CalendarIcon,
} from "@heroicons/react/solid";
import DetailedLayout from "@components/layouts/detailed";
import { pageMenu } from "..";

export default function ProjectAppsPage() {
  const router = useRouter();
  const utils = trpc.useContext();

  const { data: project, isLoading } = trpc.useQuery(
    ["api.project.get", { slug: router.query.slug }],
    {
      refetchOnWindowFocus: false,
      onError: (e) => {
        console.log("ERROR", e);
        // setErrorMessage(e.message);
      },
    }
  );

  return (
    <DetailedLayout
      pageMenu={pageMenu}
      header={
        <button
          type="button"
          className="order-0 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:order-1 sm:ml-3"
        >
          Create application
        </button>
      }
    >
      <div className="shadow sm:rounded-md sm:overflow-hidden">
        <div className="bg-white py-4 px-4 space-y-4 sm:p-4">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Applications
            </h3>
          </div>
        </div>
        <ul role="list" className="divide-y divide-gray-200 ">
          {project?.applications.map((app) => {
            const appUrl = `/projects/${project.slug}/apps/${app.id}`;

            return (
              <li key={app.id}>
                <Link href={appUrl}>
                  <a className="block hover:bg-gray-50 bg-slate-100">
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-lime-600 truncate">
                          {app.title}
                        </p>

                        <div className="ml-2 flex-shrink-0 flex">
                          <p className="px-4 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            PAID
                            <CheckCircleIcon className="ml-2 h-5 w-5 text-green-600" />
                          </p>
                        </div>
                      </div>
                      <div className="mt-2 sm:flex sm:justify-between">
                        <div className="sm:flex">
                          <div className="flex items-center text-sm text-gray-500">
                            <p className="pr-2">Brands</p>
                            <div className="flex items-center space-x-2">
                              <div className="flex flex-shrink-0 -space-x-1">
                                {app?.brands.map((brand) => (
                                  <img
                                    key={brand.id}
                                    className="max-w-none h-6 w-6 rounded-full ring-2 ring-white"
                                    src={
                                      icons.amrest.brands[
                                        brand.name.toLowerCase()
                                      ]
                                    }
                                    alt={brand.name}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                            <p className="pr-2">Countries</p>
                            <div className="flex items-center">
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
                        <p className="ml-4 flex items-center text-sm text-gray-500">
                          <span className="font-semibold mr-2">API Key:</span>
                          <span className="underline mr-2">{app.token}</span>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              navigator.clipboard.writeText(app.token);
                            }}
                          >
                            <ClipboardCopyIcon className="h-5 w-5" />
                          </button>
                        </p>
                        <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                          <CalendarIcon
                            className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                          <p>Expires on 2022-02-01</p>
                        </div>
                      </div>
                    </div>
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </DetailedLayout>
  );
}

ProjectAppsPage.Layout = DashboardLayout;
