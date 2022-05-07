import DashboardLayout from "@components/layouts/dashboard";
import DetailedLayout from "@components/layouts/detailed";
import ApplicationModalForm from "@components/projects/application-modal-form";
import { Dialog } from "@components/ui/dialog";
import {
  CalendarIcon,
  CheckCircleIcon,
  ClipboardCopyIcon,
  LocationMarkerIcon,
} from "@heroicons/react/solid";
import { trpc } from "@lib/trpc";
import Link from "next/link";
import icons from "@constants/icons";

import { useRouter } from "next/router";
import { useState } from "react";
import { appMenu } from "../overview";

const MenuHeader = () => (
  <div className="flex items-center">
    <div className="flex p-2 text-gray-900 text-xs font-medium bg-yellow-400 rounded-md">
      <LocationMarkerIcon className="h-4 w-4" />
    </div>
    <h3 className="ml-2 text-gray-900 text-md font-semibold truncate">
      Stores
    </h3>
  </div>
);
export default function ConsumersPage() {
  const { query, isReady } = useRouter();
  const utils = trpc.useContext();
  const [addAppModal, setAddAppModal] = useState(false);

  const { data } = trpc.useQuery(
    ["api.consumer.all", { appType: query.name?.toUpperCase()}],
    {
      // first render has status `undefined`
      enabled: isReady,
      refetchOnWindowFocus: false,
      onError: (e) => {
        console.log("ERROR", e);
        // setErrorMessage(e.message);
      },
    }
  );

  return (
    <DetailedLayout
      pageMenu={appMenu}
      pageMenuHeader={<MenuHeader />}
      pageTitle="Consumers"
      pageDescription="List of consumers that registered application of their website."
      pageAction={
        <button
          onClick={() => setAddAppModal(true)}
          type="button"
          className="order-0 h-10 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:order-1 sm:ml-3"
        >
          Create consumer
        </button>
      }
    >
      <ul role="list" className="divide-y divide-gray-200 ">
        {data?.map((app) => {
          const appUrl = `/apps/${query.name}/consumers/${app.id}`;

          return (
            <li key={app.id}>
              <Link href={appUrl}>
                <a className="block hover:bg-gray-50 bg-white">
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <p className="flex items-center text-sm w-1/4 font-medium text-lime-600 truncate uppercase">
                        {app.domain
                          .replace("https://", "")
                          .replace("http://", "")}
                        <span className="italic text-xs text-gray-500 ml-3">
                          {app.title}
                        </span>
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
          name={query.name}
          onClose={() => setAddAppModal(false)}
        />
      </Dialog>
    </DetailedLayout>
  );
}

ConsumersPage.Layout = DashboardLayout;
