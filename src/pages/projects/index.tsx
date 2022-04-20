import DashboardLayout from "@components/layouts/dashboard";
import { Tab } from "@headlessui/react";

import { inferQueryOutput, trpc } from "@lib/trpc";
import Link from "next/link";

export default function ProjectsPage() {
  const utils = trpc.useContext();

  const projects = trpc.useQuery(["api.project.list"]);

  console.log("QUERY", projects);

  return (
    <div className="flex flex-col">
      <main className="flex-1">
        {/* Page title & actions */}
        <div className="border-b border-gray-200 bg-gray-50 px-4 py-2 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-medium leading-6 text-gray-900 sm:truncate">
              Projects
            </h1>
          </div>
          <div className="mt-4 flex sm:mt-0 sm:ml-0">
            <button
              type="button"
              className="order-0 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:order-1 sm:ml-3"
            >
              Create project
            </button>
          </div>
        </div>

        {/* Applications table (small breakpoint and up) */}
        <div className="hidden mt-8 sm:block px-8">
          <div className="align-middle inline-block min-w-full border border-gray-200">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <span className="lg:pl-2">Project</span>
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <span className="lg:pl-2">Installed apps</span>
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <span className="lg:pl-2">Owner</span>
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <span className="lg:pl-2">Members</span>
                  </th>
                  <th className="pr-6 py-3 border-b border-gray-200 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider" />
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {projects.data?.map((project) => (
                  <tr key={project.id}>
                    <td className="px-6 py-3 max-w-0 whitespace-nowrap text-sm font-medium text-gray-900">
                      <Link href={`/projects/${project.slug}`}>
                        {project.name}
                      </Link>
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-500 font-medium uppercase">
                      {project._count.applications}
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-500 font-medium uppercase">
                      {project.owner.username}
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-500 font-medium">
                      6
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap text-right text-sm font-medium">
                      <Link href={`/projects/${project.slug}`}>Edit</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

ProjectsPage.Layout = DashboardLayout;
