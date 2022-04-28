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
import { projectMenu } from "..";
import { useState } from "react";
import ApplicationModalForm from "@components/projects/application-modal-form";
import { Dialog } from "@components/ui/dialog";

export default function ProjectAppsPage() {
  const { query } = useRouter();
  const utils = trpc.useContext();
  const [addAppModal, setAddAppModal] = useState(false);

  const projectSlug = query.slug;

  const { data: apps, isLoading } = trpc.useQuery(
    ["api.application.all", { projectSlug }],
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
      pageMenu={projectMenu}
      pageTitle="Applications"
      pageDescription="You can register at most 5 application in your plan."
      pageAction={
        <button
          onClick={() => setAddAppModal(true)}
          type="button"
          className="order-0 h-10 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:order-1 sm:ml-3"
        >
          Create application
        </button>
      }
    >
      <ul role="list" className="divide-y divide-gray-200 ">
        {apps?.map((app) => {
          const appUrl = `/projects/${projectSlug}/apps/${app.id}`;

          return (
            <li key={app.id}>
              <Link href={appUrl}>
                <a className="block hover:bg-slate-300 bg-slate-100">
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-lime-600 truncate">
                        {app.title}
                      </p>
                      <p className="text-sm font-medium text-lime-600 truncate">
                        {app.domain}
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

      {/* Add application dialog */}
      <Dialog
        header={null}
        open={addAppModal}
        onClose={() => setAddAppModal(false)}
      >
        <ApplicationModalForm
          projectSlug={projectSlug}
          onClose={() => setAddAppModal(false)}
        />
      </Dialog>
    </DetailedLayout>
  );
}

ProjectAppsPage.Layout = DashboardLayout;
