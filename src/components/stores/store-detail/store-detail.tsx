import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import {
  HeartIcon,
  LocationMarkerIcon,
  MailIcon,
  PhoneIcon,
} from "@heroicons/react/solid";
import { classNames } from "@lib/classnames";
import { Rating } from "@components/ui/rating";
import { StoreDetailEmployees } from "./store-detail-employees";
import { StoreDetailJobs } from "./store-detail-jobs";
import { StoreDetailMenu } from "./store-detail-menu";
import { StoreDetailOverview } from "./store-detail-overview";
import { StoreDetailPhotos } from "./store-detail-photos";
import { StoreDetailReviews } from "./store-detail-reviews";

const tabs = [
  {
    name: "Overview",
    href: "#",
    content: <StoreDetailOverview />,
  },
  { name: "Menu", href: "#", content: <StoreDetailMenu /> },
  { name: "Jobs", href: "#", content: <StoreDetailJobs /> },
  { name: "Employees", href: "#", content: <StoreDetailEmployees /> },
  { name: "Photos", href: "#", content: <StoreDetailPhotos /> },
  { name: "Reviews", href: "#", content: <StoreDetailReviews /> },
  { name: "Trainings", href: "#", content: null },
  { name: "Nearby", href: "#", content: null },
];

const profile = {
  name: "Ricardo Cooper",
  imageUrl:
    "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
  coverImageUrl:
    "https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
  about: `
    <p>Tincidunt quam neque in cursus viverra orci, dapibus nec tristique. Nullam ut sit dolor consectetur urna, dui cras nec sed. Cursus risus congue arcu aenean posuere aliquam.</p>
    <p>Et vivamus lorem pulvinar nascetur non. Pulvinar a sed platea rhoncus ac mauris amet. Urna, sem pretium sit pretium urna, senectus vitae. Scelerisque fermentum, cursus felis dui suspendisse velit pharetra. Augue et duis cursus maecenas eget quam lectus. Accumsan vitae nascetur pharetra rhoncus praesent dictum risus suspendisse.</p>
  `,
  fields: {
    "Located in": "Magnolia",
    Address: "ul. Legnicka 10",
    Phone: "(555) 123-4567",
    Hours: "Closed . Open 8AM Tue",
    Email: "ricardocooper@example.com",
  },
};

const team = [
  {
    name: "Leslie Alexander",
    handle: "lesliealexander",
    role: "Co-Founder / CEO",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Michael Foster",
    handle: "michaelfoster",
    role: "Co-Founder / CTO",
    imageUrl:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Dries Vincent",
    handle: "driesvincent",
    role: "Manager, Business Relations",
    imageUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Lindsay Walton",
    handle: "lindsaywalton",
    role: "Front-end Developer",
    imageUrl:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
];

export default function StoreDetail({ isOpen }) {
  const [currentTab, setCurrentTab] = useState(tabs[0]);

  const store = useSelector(
    (state: any) => state.store.selectedStore?.properties
  );

  useEffect(() => {
    if (isOpen) {
      setCurrentTab(tabs[0]);
    }
  }, [isOpen]);

  if (!store) {
    return null;
  }

  const setTab = (clickedTab: any) => {
    const currentTab = tabs.filter((tab) => tab.name === clickedTab)[0];
    setCurrentTab(currentTab);
  };

  return (
    <article>
      {/* Profile header */}
      <div>
        <div>
          <img
            className="h-32 w-full object-cover lg:h-48"
            src={profile.coverImageUrl}
            alt=""
          />
          <div className="absolute top-0 right-5 mt-3 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
            <button
              type="button"
              className="inline-flex justify-center p-2.5 border border-gray-300 shadow-sm text-sm font-medium rounded-full text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
            >
              <HeartIcon
                className="-ml-1 mr-2 h-5 w-5 text-pink-500"
                aria-hidden="true"
              />
              <span>Follow</span>
            </button>
            <button
              type="button"
              className="inline-flex justify-center p-2.5 border border-gray-300 shadow-sm text-sm font-medium rounded-full text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
            >
              <LocationMarkerIcon
                className="-ml-1 mr-2 h-5 w-5 text-blue-500"
                aria-hidden="true"
              />
              <span>Directions</span>
            </button>
          </div>
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
            <div className="flex">
              <img
                className="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32"
                src={profile.imageUrl}
                alt=""
              />
            </div>
            <div className="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6">
              <div className="2xl:block -mt-4 sm:mt-12 min-w-0 flex-1 pl-2">
                <h1 className="text-2xl font-bold text-gray-900 truncate">
                  {store.brand_full} {store.name}
                </h1>
                <div className="flex flex-col justify-between pl-0 space-y-1">
                  <span className="relative text-sm font-semibold pl-5">
                    <span className="flex absolute h-3 w-3 top-2.5 left-0 -mt-1 -mr-1">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-600 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-600"></span>
                    </span>
                    <span className="text-green-600 font-semibold">Open</span> -
                    Closes 8 PM
                  </span>
                  <Rating count={120} rate={3.5} />
                </div>
              </div>
              <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                >
                  <MailIcon
                    className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <span>Message</span>
                </button>
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                >
                  <PhoneIcon
                    className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <span>Call</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="overflow-x-auto md:overflow-hidden sticky md:relative top-0 mt-6 sm:mt-2 2xl:mt-1 z-50 bg-white">
        <div className="border-b border-gray-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              {tabs.map((tab) => {
                const isCurrent = tab.name === currentTab.name;

                return (
                  <a
                    key={tab.name}
                    href={tab.href}
                    onClick={() => setTab(tab.name)}
                    className={classNames(
                      isCurrent
                        ? "border-pink-500 text-gray-900"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                      "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                    )}
                    aria-current={isCurrent ? "page" : undefined}
                  >
                    {tab.name}
                  </a>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {currentTab?.content}
    </article>
  );
}
