import Layout from "../components/layout/layout";
import Map from "@components/map";
import { useStoresQuery } from "@api/stores/get-all-stores";
import { icons } from "../constants";
import countries from "../constants/countries";

import Image from "next/image";
import restaurantImg from "../assets/restaurant.jpg";

function StoreListRow({ store }) {
  return (
    <li>
      <article
        tabIndex="0"
        className="flex cursor-pointer border rounded-md p-2 bg-gray-600 text-gray-700 mb-2 hover:border-green-600 focus:outline-none focus:border-green-500"
      >
        {/* Store image */}
        <div className="flex relative h-24 w-[25%]">
          <Image
            className="rounded-2xl"
            src={restaurantImg}
            alt="Picture of the restaurant"
            layout="fill"
            objectFit="cover"
          />
        </div>
        {/* Store details info */}
        <div className="flex flex-col h-full mx-2">
          <div className="flex items-center pl-3 pr-4 h-1/4 w-fit rounded-3xl bg-gray-100">
            <div className="flex relative h-7 w-7">
              <Image
                src={icons.amrest.markers[store.brand]}
                alt="Picture of the restaurant"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="flex flex-col items-center ml-2 py-0.5">
              <span className="text-sm font-semibold leading-none">
                {store.brand.toUpperCase()}
              </span>
              <span className="text-sm leading-none">{store.name}</span>
            </div>
            <div className="relative bottom-2 left-1 w-2 h-2 rounded-full bg-green-700"></div>
          </div>
          <div className="text-gray-100 text-[0.82rem] leading-snug pt-1">
            <p>
              <span className="font-bold">Address:</span> {store.address}
            </p>
            <p>
              <span className="font-bold">Phone:</span> {store.phone}
            </p>
            <p>
              <span className="font-bold">Hours:</span> 08:00 - 16:00
            </p>
          </div>
        </div>
        {/* Store summary and rate */}
        <div className="flex flex-col justify-between text-gray-100 text-xs">
          {/* Summary */}

          <div className="flex justify-end">
            <div className="flex flex-col font-semibold">
              <p>Empl:</p>
              <p>Jobs:</p>
              <p>Train:</p>
            </div>
            <div className="flex flex-col items-end ml-2">
              <p>10</p>
              <p>2</p>
              <p>90%</p>
            </div>
          </div>

          {/* Rates */}
          <div className="flex flex-col items-end text-gray-100 text-xs font-semibold">
            <div className="flex items-center">
              <p>3.5</p>
              <ul className="flex justify-center ml-1">
                <li>
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="star"
                    className="w-3 text-yellow-500 mr-1"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                  >
                    <path
                      fill="currentColor"
                      d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                    ></path>
                  </svg>
                </li>
                <li>
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="star"
                    className="w-3 text-yellow-500 mr-1"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                  >
                    <path
                      fill="currentColor"
                      d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                    ></path>
                  </svg>
                </li>
                <li>
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="star"
                    className="w-3 text-yellow-500 mr-1"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                  >
                    <path
                      fill="currentColor"
                      d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                    ></path>
                  </svg>
                </li>
                <li>
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="far"
                    data-icon="star"
                    className="w-3 text-yellow-500 mr-1"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                  >
                    <path
                      fill="currentColor"
                      d="M528.1 171.5L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6zM388.6 312.3l23.7 138.4L288 385.4l-124.3 65.3 23.7-138.4-100.6-98 139-20.2 62.2-126 62.2 126 139 20.2-100.6 98z"
                    ></path>
                  </svg>
                </li>
                <li>
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="far"
                    data-icon="star"
                    className="w-3 text-yellow-500"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                  >
                    <path
                      fill="currentColor"
                      d="M528.1 171.5L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6zM388.6 312.3l23.7 138.4L288 385.4l-124.3 65.3 23.7-138.4-100.6-98 139-20.2 62.2-126 62.2 126 139 20.2-100.6 98z"
                    ></path>
                  </svg>
                </li>
              </ul>
            </div>
            <div className="flex justify-between font-semibold text-white text-xs">
              <span>120 reviews</span>
            </div>
          </div>
        </div>
      </article>
    </li>
  );
}

export default function Zendesk() {
  const { data, isLoading, error } = useStoresQuery({
    brand: "kfc",
    country: "pl",
  });

  console.log("DATA", data);

  return (
    <div className="h-screen w-full flex overflow-hidden antialiased text-gray-800 bg-white">
      {/* <!-- section body side nav --> */}
      <nav
        aria-label="side bar"
        aria-orientation="vertical"
        className="flex-none flex flex-col items-center text-center bg-gray-700 text-gray-400"
      >
        <div className="h-14 flex items-center w-full">
          <img
            className="h-6 w-6 mx-auto"
            src="https://raw.githubusercontent.com/bluebrown/tailwind-zendesk-clone/master/public/assets/leaves.png"
          />
        </div>
        <ul>
          <li>
            <a
              title="Home"
              href="#home"
              className="h-16 px-2 flex flex-col items-center justify-center text-white bg-slate-500 w-full border-b border-gray-600"
            >
              <i className="mx-auto pb-1">
                <svg
                  className="fill-current h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 6.453l9 8.375v9.172h-6v-6h-6v6h-6v-9.172l9-8.375zm12 5.695l-12-11.148-12 11.133 1.361 1.465 10.639-9.868 10.639 9.883 1.361-1.465z" />
                </svg>
              </i>
              <span className="text-xs">Stores</span>
            </a>
          </li>
          <li>
            <a
              title="Views"
              href="#views"
              className="h-16 px-2 flex flex-col items-center justify-center hover:text-white w-full border-b border-gray-600"
            >
              <i className="mx-auto pb-1">
                <svg
                  className="fill-current h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.546 3h-13.069l-5.477 8.986v9.014h24v-9.014l-5.454-8.986zm-3.796 12h-5.5l-2.25-3h-4.666l4.266-7h10.82l4.249 7h-4.669l-2.25 3zm-9.75-4l.607-1h12.787l.606 1h-14zm12.18-3l.607 1h-11.573l.607-1h10.359zm-1.214-2l.606 1h-9.144l.607-1h7.931z" />
                </svg>
              </i>
              <span className="text-xs">Job offers</span>
            </a>
          </li>
          <li>
            <a
              title="Customer Lists"
              href="#customer-lists"
              className="h-16 px-2 flex flex-col items-center justify-center hover:text-white w-full border-b border-gray-600"
            >
              <i className="mx-auto pb-1">
                <svg
                  className="fill-current h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 7.001c0 3.865-3.134 7-7 7s-7-3.135-7-7c0-3.867 3.134-7.001 7-7.001s7 3.134 7 7.001zm-1.598 7.18c-1.506 1.137-3.374 1.82-5.402 1.82-2.03 0-3.899-.685-5.407-1.822-4.072 1.793-6.593 7.376-6.593 9.821h24c0-2.423-2.6-8.006-6.598-9.819z" />
                </svg>
              </i>
              <span className="text-xs">Trainings</span>
            </a>
          </li>
        </ul>
        <div className="mt-auto h-16 flex items-center w-full">
          <img
            style={{ filter: "invert(85%)" }}
            className="h-8 w-10 mx-auto"
            src="https://raw.githubusercontent.com/bluebrown/tailwind-zendesk-clone/master/public/assets/chi.png"
          />
        </div>
      </nav>
      <div className="flex-1 flex flex-col">
        {/* <!-- section body top nav --> */}
        <nav
          aria-label="top bar"
          className="flex-none flex items-center justify-between bg-gray-700 h-14"
        >
          {/* <!-- top bar left --> */}
          <span
            aria-label="top bar left"
            aria-orientation="horizontal"
            className="text-lg font-semibold text-white pl-5"
          >
            Business Radar
          </span>
          {/* <!-- to bar right  --> */}
          <ul
            aria-label="top bar right"
            aria-orientation="horizontal"
            className="px-8 flex items-center"
          >
            <li className="relative">
              <input
                title="Search Bar"
                aria-label="search bar"
                role="search"
                className="pr-8 pl-4 py-2 rounded-md cursor-pointer transition-all duration-300 ease-in-out focus:border-black focus:cursor-text w-4 focus:w-64 placeholder-transparent focus:placeholder-gray-500"
                type="text"
                placeholder="Search Chi Desk Support"
              />
              <i className="pointer-events-none absolute top-0 right-0 h-full flex items-center pr-3">
                <svg
                  className="fill-current w-4 h-4 mx-auto"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M21.172 24l-7.387-7.387c-1.388.874-3.024 1.387-4.785 1.387-4.971 0-9-4.029-9-9s4.029-9 9-9 9 4.029 9 9c0 1.761-.514 3.398-1.387 4.785l7.387 7.387-2.828 2.828zm-12.172-8c3.859 0 7-3.14 7-7s-3.141-7-7-7-7 3.14-7 7 3.141 7 7 7z" />
                </svg>
              </i>
            </li>
            <li className="h-8 w-8 ml-3">
              <button
                title="Notifications"
                aria-label="notifications"
                className="w-full h-full text-white bg-gray-600 rounded-md focus:outline-none focus:shadow-outline"
              >
                <i>
                  <svg
                    className="fill-current w-4 h-4 mx-auto"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M15.137 3.945c-.644-.374-1.042-1.07-1.041-1.82v-.003c.001-1.172-.938-2.122-2.096-2.122s-2.097.95-2.097 2.122v.003c.001.751-.396 1.446-1.041 1.82-4.667 2.712-1.985 11.715-6.862 13.306v1.749h20v-1.749c-4.877-1.591-2.195-10.594-6.863-13.306zm-3.137-2.945c.552 0 1 .449 1 1 0 .552-.448 1-1 1s-1-.448-1-1c0-.551.448-1 1-1zm3 20c0 1.598-1.392 3-2.971 3s-3.029-1.402-3.029-3h6z" />
                  </svg>
                </i>
              </button>
            </li>
            <li className="h-8 w-8 ml-3">
              <button
                title="v2 REPL"
                aria-label="repl"
                className="w-full h-full text-white bg-gray-600 rounded-md focus:outline-none focus:shadow-outline"
              >
                <i>
                  <svg
                    className="fill-current w-4 h-4 mx-auto"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22 6v16h-20v-16h20zm2-6h-24v24h24v-24zm-11 11v1.649l3.229 1.351-3.229 1.347v1.653l5-2.201v-1.599l-5-2.2zm-7 2.201v1.599l5 2.2v-1.653l-3.229-1.347 3.229-1.351v-1.649l-5 2.201z" />
                  </svg>
                </i>
              </button>
            </li>
            <li className="h-8 w-8 ml-3">
              <button
                title="Products"
                aria-label="chi desk products"
                className="w-full h-full rounded-md focus:outline-none focus:shadow-outline"
              >
                <i className="text-gray-600">
                  <svg
                    className="fill-current w-5 h-5 mx-auto"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M11 11h-11v-11h11v11zm13 0h-11v-11h11v11zm-13 13h-11v-11h11v11zm13 0h-11v-11h11v11z" />
                  </svg>
                </i>
              </button>
            </li>
            <li className="h-10 w-10 ml-3">
              <button
                title="Page Menu"
                aria-label="page menu"
                className="h-full w-full rounded-full border focus:outline-none focus:shadow-outline"
              >
                <img
                  className="h-full w-full rounded-full mx-auto"
                  src="https://raw.githubusercontent.com/bluebrown/tailwind-zendesk-clone/master/public/assets/me.jpg"
                />
              </button>
            </li>
          </ul>
        </nav>
        {/* <!-- main content --> */}
        <main className="flex-grow flex min-h-0 border-t">
          {/* <!-- search section --> */}
          <section className="flex flex-col p-4 w-full max-w-lg flex-none bg-gray-100 min-h-0 overflow-auto">
            <div className="flex flex-row items-center mb-4">
              <button className="flex items-center justify-center h-10 w-10 bg-white text-gray-500 ml-1 rounded-l-lg">
                <svg
                  className="w-4 h-4 stroke-current"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </button>
              <input
                type="text"
                className="border border-transparent w-full focus:outline-none text-sm h-10 flex items-center rounded-lg rounded-l-none px-2"
                placeholder="Find a store..."
              />
            </div>
            <ul>
              {data?.features.map((store) => (
                <StoreListRow store={store.properties} />
              ))}

              <li>
                <article
                  tabindex="0"
                  className="flex cursor-pointer border rounded-md p-2 bg-gray-600 text-gray-700 mb-2 hover:border-green-600 focus:outline-none focus:border-green-500"
                >
                  {/* Store image */}
                  <div className="flex relative h-24 w-[25%]">
                    <Image
                      className="rounded-2xl"
                      src={restaurantImg}
                      alt="Picture of the restaurant"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  {/* Store details info */}
                  <div className="flex flex-col h-full mx-2">
                    <div className="flex items-center pl-3 pr-4 h-1/4 w-fit rounded-3xl bg-gray-100">
                      <div className="flex relative h-7 w-7">
                        <Image
                          src={icons.amrest.markers.kfc}
                          alt="Picture of the restaurant"
                          layout="fill"
                          objectFit="cover"
                        />
                      </div>
                      <div className="flex flex-col items-center ml-2 py-0.5">
                        <span className="text-sm font-semibold leading-none">
                          KFC
                        </span>
                        <span className="text-sm leading-none">
                          N-Park Maślice
                        </span>
                      </div>
                      <div className="relative bottom-2 left-1 w-2 h-2 rounded-full bg-green-700"></div>
                    </div>
                    <div className="text-gray-100 text-[0.82rem] leading-snug pt-1">
                      <p>
                        <span className="font-bold">Address:</span> Maślicka
                        154, 54-089 Wrocław
                      </p>
                      <p>
                        <span className="font-bold">Phone:</span> 572 523 123
                      </p>
                      <p>
                        <span className="font-bold">Hours:</span> 08:00 - 16:00
                      </p>
                    </div>
                  </div>
                  {/* Store summary and rate */}
                  <div className="flex flex-col justify-between text-gray-100 text-xs">
                    {/* Summary */}

                    <div className="flex justify-end">
                      <div className="flex flex-col font-semibold">
                        <p>Empl:</p>
                        <p>Jobs:</p>
                        <p>Train:</p>
                      </div>
                      <div className="flex flex-col items-end ml-2">
                        <p>10</p>
                        <p>2</p>
                        <p>90%</p>
                      </div>
                    </div>

                    {/* Rates */}
                    <div className="flex flex-col items-end text-gray-100 text-xs font-semibold">
                      <div className="flex items-center">
                        <p>3.5</p>
                        <ul className="flex justify-center ml-1">
                          <li>
                            <svg
                              aria-hidden="true"
                              focusable="false"
                              data-prefix="fas"
                              data-icon="star"
                              className="w-3 text-yellow-500 mr-1"
                              role="img"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 576 512"
                            >
                              <path
                                fill="currentColor"
                                d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                              ></path>
                            </svg>
                          </li>
                          <li>
                            <svg
                              aria-hidden="true"
                              focusable="false"
                              data-prefix="fas"
                              data-icon="star"
                              className="w-3 text-yellow-500 mr-1"
                              role="img"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 576 512"
                            >
                              <path
                                fill="currentColor"
                                d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                              ></path>
                            </svg>
                          </li>
                          <li>
                            <svg
                              aria-hidden="true"
                              focusable="false"
                              data-prefix="fas"
                              data-icon="star"
                              className="w-3 text-yellow-500 mr-1"
                              role="img"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 576 512"
                            >
                              <path
                                fill="currentColor"
                                d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                              ></path>
                            </svg>
                          </li>
                          <li>
                            <svg
                              aria-hidden="true"
                              focusable="false"
                              data-prefix="far"
                              data-icon="star"
                              className="w-3 text-yellow-500 mr-1"
                              role="img"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 576 512"
                            >
                              <path
                                fill="currentColor"
                                d="M528.1 171.5L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6zM388.6 312.3l23.7 138.4L288 385.4l-124.3 65.3 23.7-138.4-100.6-98 139-20.2 62.2-126 62.2 126 139 20.2-100.6 98z"
                              ></path>
                            </svg>
                          </li>
                          <li>
                            <svg
                              aria-hidden="true"
                              focusable="false"
                              data-prefix="far"
                              data-icon="star"
                              className="w-3 text-yellow-500"
                              role="img"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 576 512"
                            >
                              <path
                                fill="currentColor"
                                d="M528.1 171.5L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6zM388.6 312.3l23.7 138.4L288 385.4l-124.3 65.3 23.7-138.4-100.6-98 139-20.2 62.2-126 62.2 126 139 20.2-100.6 98z"
                              ></path>
                            </svg>
                          </li>
                        </ul>
                      </div>
                      <div className="flex justify-between font-semibold text-white text-xs">
                        <span>120 reviews</span>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
              <li>
                <article
                  tabindex="0"
                  className="cursor-pointer border rounded-md p-3 bg-white flex text-gray-700 mb-2 hover:border-green-500 focus:outline-none focus:border-green-500"
                >
                  <span className="flex-none pt-1 pr-2">
                    <img
                      className="h-8 w-8 rounded-md"
                      src="https://raw.githubusercontent.com/bluebrown/tailwind-zendesk-clone/master/public/assets/avatar.png"
                    />
                  </span>
                  <div className="flex-1">
                    <header className="mb-1">
                      Tarun T <span className="font-semibold">commented</span>{" "}
                      on
                      <h1 className="inline">"RE: WPMS issue".</h1>
                    </header>
                    <p className="text-gray-600">
                      Hi Mazhar, Please note this issue comes when user is not
                      closing or logout sy…
                    </p>
                    <footer className="text-gray-500 mt-2 text-sm">
                      Friday 22:16
                    </footer>
                  </div>
                </article>
              </li>
            </ul>
          </section>
          {/* <!-- section content --> */}
          <section
            aria-label="main content"
            className="flex min-h-0 flex-col flex-auto border-l"
          >
            {/* <!-- content navigation --> */}
            <nav className="flex bg-gray-100">
              {/* <!-- brands filter --> */}
              <section
                aria-labelledby="open-tickets-tabs-label"
                className="flex flex-col items-center justify-center pt-1 pb-2 pr-4 border border-r-2 mr-4 focus:outline-none w-2/5"
              >
                <ul className="flex pt-1 px-2 rounded-md bg-gray-100">
                  <li>
                    <span>Brands</span>
                  </li>
                  {Object.keys(icons.amrest.brands).map((key, index) => (
                    <li>
                      <button className="px-1 rounded-full flex flex-col items-center justify-between">
                        <img
                          className="object-cover h-[30px]"
                          src={icons.amrest.brands[key]}
                        />
                        <span className="text-xs font-semibold text-gray-500 pt-1">
                          {key.toUpperCase()}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </section>
              {/* <!-- countries filter --> */}
              <section
                aria-labelledby="ticket-statistics-tabs-label"
                className="flex flex-col items-center justify-center pt-1 pb-2 pr-4 mr-4 focus:outline-none w-3/5 overflow-x-auto"
              >
                <ul className="flex pt-1 px-2 rounded-md bg-gray-100">
                  <li>
                    <span>Countries</span>
                  </li>
                  {countries.map((country, index) => (
                    <li>
                      <button className="px-1 rounded-full flex flex-col items-center justify-between">
                        <img
                          className="object-cover rounded-full h-[30px] w-[30px]"
                          src={country.img}
                        />
                        <span className="text-xs font-semibold text-gray-500 pt-1">
                          {country.value.toUpperCase()}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </section>
            </nav>
            {/* Content map */}

            <Map cluster={true} locations={data} />

            {/* <!-- content footer, currently hidden --> */}
            <footer
              aria-label="content footer"
              className="flex p-3 bg-white border-t hidden"
            >
              footer
            </footer>
          </section>
        </main>
      </div>
    </div>
  );
}

Zendesk.Layout = Layout;
