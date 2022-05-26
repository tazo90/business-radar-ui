import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";
import {
  CalendarIcon,
  ClipboardCopyIcon,
  PlusIcon,
} from "@heroicons/react/solid";

import { Dialog } from "@components/ui/dialog";
import DashboardLayout from "@components/layouts/dashboard";
import DetailedLayout from "@components/layouts/detailed";
import { trpc } from "@lib/trpc";
import icons from "@constants/icons";
import { appMenu } from "../overview";
import Button from "@components/ui/button";
import ConsumerAddModal from "@components/consumers/consumer-add-modal";

export default function ConsumersPage() {
  const { query, isReady } = useRouter();
  const utils = trpc.useContext();
  const [customerAddModal, setCustomerAddModal] = useState(false);

  const { data } = trpc.useQuery(
    ["api.consumer.all", { appType: query.name?.toUpperCase() }],
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
      app={query.name}
      pageMenu={appMenu}
      pageTitle="Consumers"
      pageDescription="List of consumers that registered application of their website."
      pageAction={
        <Button
          onClick={() => setCustomerAddModal(true)}
          StartIcon={PlusIcon}
          color="add"
          className="h-8"
        >
          Create consumer
        </Button>
      }
    >
      <ul role="list" className="divide-y divide-gray-200 ">
        {data?.map((app) => {
          const appUrl = `/apps/${query.name}/consumers/${app.uid}`;

          return (
            <li key={app.id}>
              <Link href={appUrl}>
                <a className="block hover:bg-gray-50 bg-white">
                  <div className="grid grid-cols-1 sm:grid-cols-3 px-4 py-1 sm:px-6">
                    <div className="flex flex-col justify-center">
                      <p className="text-sm w-1/4 font-medium text-lime-600 uppercase">
                        {app.domain
                          .replace("https://", "")
                          .replace("http://", "")}
                      </p>
                      <p className="italic text-xs text-gray-500">
                        {app.title}
                      </p>
                    </div>

                    <div className="flex flex-col">
                      <div className="flex items-center text-sm text-gray-500">
                        <p className="pr-3">Brands</p>
                        <div className="flex items-center space-x-2 ml-4">
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
                      </div>
                      <div className="flex items-center text-sm text-gray-500 sm:mt-0">
                        <p className="pr-3">Countries</p>
                        <div className="flex items-center space-x-1">
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

                    <div className="flex flex-col justify-center sm:items-end">
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        <CalendarIcon
                          className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                        <p>Expires on 2022-02-01</p>
                      </div>
                      <p className="flex text-sm text-gray-500 space-x-2">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            navigator.clipboard.writeText(app.apiKey);
                          }}
                        >
                          <ClipboardCopyIcon className="h-5 w-5" />
                        </button>
                        <span className="font-semibold">API Key:</span>
                        <span className="underline">{app.apiKey}</span>
                      </p>
                    </div>
                  </div>
                </a>
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Consumer add modal */}
      <Dialog open={customerAddModal} onOpenChange={setCustomerAddModal}>
        <ConsumerAddModal
          application={query.name?.toUpperCase()}
          onClose={() => setCustomerAddModal(false)}
        />
      </Dialog>
    </DetailedLayout>
  );
}

ConsumersPage.Layout = DashboardLayout;
