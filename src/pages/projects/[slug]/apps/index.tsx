import DashboardLayout from "@components/layouts/dashboard";
import { trpc } from "@lib/trpc";
import Link from "next/link";
import { useRouter } from "next/router";
import icons from "@constants/icons";

import { CheckCircleIcon } from "@heroicons/react/solid";

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

  console.log("APPS", project);

  console.log("SLUG", router.query.slug);

  return (
    <div className="flex flex-col">
      <main className="flex-1">
        {/* Page title & actions */}
        <div className="border-b border-gray-200 bg-gray-50 px-4 py-2 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-medium leading-6 text-gray-900 sm:truncate">
              Project {project?.name}
            </h1>
          </div>
          <div className="mt-4 flex sm:mt-0 sm:ml-0">
            <button
              type="button"
              className="order-0 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:order-1 sm:ml-3"
            >
              Create application
            </button>
          </div>
        </div>

        {/* Applications table (small breakpoint and up) */}
        <div className="hidden mt-8 sm:block px-8">
          <div className="align-middle inline-block min-w-full ">
            <div className="bg-pink-300 w-32 rounded-tl-lg rounded-tr-lg">
              <h2 className="px-4 py-2">Applications</h2>
            </div>
            <table className="min-w-full border border-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <span className="lg:pl-2">Application</span>
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <span className="lg:pl-2">Brands</span>
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <span className="lg:pl-2">Countries</span>
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <span className="lg:pl-2">Paid</span>
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <span className="lg:pl-2">API key</span>
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <span className="lg:pl-2">Expires</span>
                  </th>
                  <th className="pr-6 py-3 border-b border-gray-200 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider" />
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {project?.applications.map((app) => {
                  const appUrl = `/projects/${project.slug}/apps/${app.id}`;

                  return (
                    <tr key={app.id}>
                      <td className="px-6 py-3 max-w-0 whitespace-nowrap text-sm font-medium text-gray-900">
                        <Link href={appUrl}>{app.title}</Link>
                      </td>
                      <td className="px-6 py-3 text-sm text-gray-500 font-medium uppercase">
                        <div className="flex items-center space-x-2">
                          <div className="flex flex-shrink-0 -space-x-1">
                            {app?.brands.map((brand) => (
                              <img
                                key={brand.id}
                                className="max-w-none h-6 w-6 rounded-full ring-2 ring-white"
                                src={
                                  icons.amrest.brands[brand.name.toLowerCase()]
                                }
                                alt={brand.name}
                              />
                            ))}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-3 text-sm text-gray-500 font-medium uppercase">
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
                      </td>
                      <td className="px-6 py-3 text-sm text-gray-500 font-medium">
                        <CheckCircleIcon className="h-5 w-5 text-green-600" />
                      </td>
                      <td className="px-6 py-3 text-sm text-gray-500 font-medium">
                        {app.token}
                      </td>
                      <td className="px-6 py-3 text-sm text-gray-500 font-medium">
                        2022-03-02 10:20
                      </td>
                      <td className="px-6 py-3 whitespace-nowrap text-right text-sm font-medium">
                        <Link href={appUrl}>Edit</Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

ProjectAppsPage.Layout = DashboardLayout;
