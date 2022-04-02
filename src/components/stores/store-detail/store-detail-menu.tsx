import { useState } from "react";
import { PlusIcon } from "@heroicons/react/solid";
import { Link, Element, scroller } from "react-scroll";

import { capitalize } from "../../../utils/";
import { useCategoriesQuery } from "../../../api/category/get-all-categories";

function makeTitleToDOMId(title: string) {
  return title.toLowerCase().split(" ").join("_");
}

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function StoreDetailMenu() {
  const [activeCategory, setActiveCategory] = useState(null);

  const { data, isLoading, error } = useCategoriesQuery({});
  const categories = data;

  const onScroll = (category: any) => {
    const elementId = makeTitleToDOMId(category.name);

    scroller.scrollTo(elementId, {
      containerId: "drawer-content",
      duration: 500,
      delay: 100,
      smooth: true,
      offset: window.innerWidth > 768 ? -10 : -180,
    });

    setActiveCategory(category);
  };

  return (
    <>
      <div className="lg:py-1 xl:py-0 border-b border-gray-300 pb-9 md:pb-14 lg:pb-16 2xl:pb-20 3xl:pb-24">
        <div className="flex flex-col md:flex-row">
          <nav className="sticky top-16 md:w-72 xl:w-3/12 mb-8 md:mb-0 w-full z-50">
            <ol className="md:sticky md:top-4 flex md:flex-col overflow-x-auto bg-white">
              {categories?.map((category) => (
                <li key={category.id} className="mx-4 md:h-14">
                  <Link
                    onClick={() => onScroll(category)}
                    spy={true}
                    offset={-120}
                    smooth={true}
                    duration={500}
                    to={makeTitleToDOMId(category.name)}
                    className={classNames(
                      "block font-semibold cursor-pointer text-sm lg:text-base text-gray-700 px-2",
                      activeCategory?.name === category.name
                        ? "underline underline-offset-4"
                        : ""
                    )}
                  >
                    <div className="md:flex md:items-center">
                      <img
                        src={category.img}
                        className="w-16 md:w-12 md:mr-4"
                      />
                      {capitalize(category.name.toLowerCase())}
                    </div>
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
          {/* End of section scroll spy menu */}

          <div className="px-4 md:w-9/12 md:ps-8 pt-0 lg:pt-2">
            {categories?.map((category) => (
              // @ts-ignore
              <Element
                name={makeTitleToDOMId(category.name)}
                key={category.id}
                id={category.id.toString()}
                className="mb-10"
              >
                <h2 className="text-2xl text-heading font-bold mb-4">
                  {capitalize(category.name.toLowerCase())}
                </h2>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
                  {Object.keys(category?.products).map((productId) => {
                    const product = category.products[productId];

                    return (
                      <div
                        className="relative flex flex-col group"
                        key={productId}
                      >
                        <img
                          src={product.img}
                          className="object-cover cursor-pointer group-hover:bg-gray-200 bg-gray-100 rounded-lg"
                        />
                        <span className="font-semibold text-md md:text-sm">
                          {product.name}
                        </span>
                        <span className="text-md md:text-sm">
                          PLN {product.price}
                        </span>
                        <button className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black flex items-center justify-center group-hover:bg-lime-600">
                          <PlusIcon className="w-5 h-5 text-white" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </Element>
            ))}
          </div>
          {/* End of content */}
        </div>
      </div>
    </>
  );
}
