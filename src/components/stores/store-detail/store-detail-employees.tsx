import { Fragment, useState } from "react";
import { Disclosure, Listbox, Menu, Transition } from "@headlessui/react";
import {
  ArrowNarrowLeftIcon,
  ArrowNarrowRightIcon,
  BriefcaseIcon,
  CalendarIcon,
  CheckCircleIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  CurrencyDollarIcon,
  LinkIcon,
  LocationMarkerIcon,
  MailIcon,
  PencilIcon,
  SearchIcon,
} from "@heroicons/react/solid";

const candidates = [
  {
    name: "Emily Selman",
    email: "emily.selman@example.com",
    imageUrl:
      "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    joined: "January 7, 2020",
    position: "General Manager",
    level: 5,
    status: "Active",
  },
  // More candidates...
];
const publishingOptions = [
  {
    name: "Published",
    description: "This job posting can be viewed by anyone who has the link.",
    current: true,
  },
  {
    name: "Draft",
    description: "This job posting will no longer be publicly accessible.",
    current: false,
  },
];

export function StoreDetailEmployees() {
  return (
    <div className="mt-4 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Stacked list */}
      <ul
        role="list"
        className="mt-5 border-t border-gray-200 divide-y divide-gray-200 sm:mt-0 sm:border-t-0"
      >
        {candidates.map((candidate) => (
          <li key={candidate.email}>
            <a href="#" className="group block">
              <div className="flex items-center py-5 px-4 sm:py-6 sm:px-0">
                <div className="min-w-0 flex-1 flex items-center">
                  <div className="flex-shrink-0">
                    <img
                      className="h-12 w-12 rounded-full group-hover:opacity-75"
                      src={candidate.imageUrl}
                      alt=""
                    />
                  </div>
                  <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-3 md:gap-4">
                    <div>
                      <p className="text-sm font-medium text-purple-600 truncate">
                        {candidate.name}
                      </p>
                      <p className="mt-2 flex items-center text-sm text-gray-500">
                        <MailIcon
                          className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                        <span className="truncate">{candidate.email}</span>
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-purple-600 truncate">
                        {candidate.position}
                      </p>
                      <p className="mt-2 flex items-center text-sm text-gray-500">
                        on level {candidate.level}
                      </p>
                    </div>
                    <div className="hidden md:block">
                      <div>
                        <p className="text-sm text-gray-900">
                          Joined on {candidate.joined}
                        </p>
                        <p className="mt-2 flex items-center text-sm text-gray-500">
                          <CheckCircleIcon
                            className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400"
                            aria-hidden="true"
                          />
                          {candidate.status}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <ChevronRightIcon
                    className="h-5 w-5 text-gray-400 group-hover:text-gray-700"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul>

      {/* Pagination */}
      <nav
        className="border-t border-gray-200 px-4 flex items-center justify-between sm:px-0"
        aria-label="Pagination"
      >
        <div className="-mt-px w-0 flex-1 flex">
          <a
            href="#"
            className="border-t-2 border-transparent pt-4 pr-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-200"
          >
            <ArrowNarrowLeftIcon
              className="mr-3 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
            Previous
          </a>
        </div>
        <div className="hidden md:-mt-px md:flex">
          <a
            href="#"
            className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
          >
            1
          </a>
          {/* Current: "border-purple-500 text-purple-600", Default: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200" */}
          <a
            href="#"
            className="border-purple-500 text-purple-600 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
            aria-current="page"
          >
            2
          </a>
          <a
            href="#"
            className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
          >
            3
          </a>
          <a
            href="#"
            className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
          >
            4
          </a>
          <a
            href="#"
            className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
          >
            5
          </a>
          <a
            href="#"
            className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
          >
            6
          </a>
        </div>
        <div className="-mt-px w-0 flex-1 flex justify-end">
          <a
            href="#"
            className="border-t-2 border-transparent pt-4 pl-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-200"
          >
            Next
            <ArrowNarrowRightIcon
              className="ml-3 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </a>
        </div>
      </nav>
    </div>
  );
}
