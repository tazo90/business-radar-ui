import { useState } from "react";
import { PlusIcon } from "@heroicons/react/solid";
import { Link, Element, scroller } from "react-scroll";

import { capitalize } from "../../../utils/";
import { useCategoriesQuery } from "../../../api/category/get-all-categories";
import { classNames } from "../../../utils/classnames";

interface StoreDetailMenuProps {
  showMenuImage?: boolean;
}

function makeTitleToDOMId(title: string) {
  return title.toLowerCase().split(" ").join("_");
}

export function StoreDetailMenu({
  showMenuImage = true,
}: StoreDetailMenuProps) {
  const [activeCategory, setActiveCategory] = useState(null);

  const { data, isLoading, error } = useCategoriesQuery({});

  const onScroll = (category: any) => {
    const elementId = makeTitleToDOMId(category.name);

    const offsetWithImage = showMenuImage ? -170 : -150;

    scroller.scrollTo(elementId, {
      containerId: "drawer-content",
      duration: 500,
      delay: 100,
      smooth: true,
      offset: window.innerWidth > 768 ? -10 : offsetWithImage,
    });

    setActiveCategory(category);
  };

  return (
    <>
      <div className="lg:py-1 xl:py-0 border-b border-gray-300 md:pt-4 pb-9 md:pb-14 lg:pb-16 2xl:pb-20 3xl:pb-24">
        <div className="flex flex-col md:flex-row">
          <nav className="sticky top-16 md:w-72 xl:w-4/12 mb-8 md:mb-0 w-full z-50 md:pt-2">
            <ol className="md:sticky md:top-4 flex md:flex-col items-center md:items-start overflow-x-auto bg-white">
              {data?.map((category: any) => (
                <li
                  key={category.id}
                  className={classNames(
                    showMenuImage
                      ? "md:h-12 mx-4 py-2 md:py-0"
                      : "md:h-10 ml-4 py-3"
                  )}
                >
                  <Link
                    onClick={() => onScroll(category)}
                    spy={true}
                    offset={-120}
                    smooth={true}
                    duration={500}
                    to={makeTitleToDOMId(category.name)}
                    className={classNames(
                      "block font-semibold cursor-pointer text-sm lg:text-base text-gray-700 py-2 md:py-0 px-4 md:bg-white rounded-full",
                      activeCategory?.name === category.name
                        ? "underline underline-offset-4 decoration-2"
                        : "",
                      showMenuImage ? "px-0 md:rounded" : "bg-gray-200"
                    )}
                  >
                    <div className="flex md:flex-row flex-col items-center whitespace-nowrap">
                      {showMenuImage && (
                        <img
                          src={category.img}
                          className="object-cover h-12 w-14 md:w-12 md:mr-4"
                        />
                      )}
                      <span className="text-md">
                        {capitalize(category.name.toLowerCase())}
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
          {/* End of section scroll spy menu */}

          <div className="px-4 md:w-9/12 md:ps-8 pt-0 lg:pt-2">
            {data?.map((category: any) => (
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
                        <button className="absolute top-1 right-1 w-8 h-8 rounded-full bg-black flex items-center justify-center group-hover:bg-black border border-black">
                          <PlusIcon className="w-5 h-5 text-white group-hover:text-white" />
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
