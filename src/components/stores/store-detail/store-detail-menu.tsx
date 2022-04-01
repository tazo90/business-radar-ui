import { useState } from "react";
import { Link, Element, scroller } from "react-scroll";

function makeTitleToDOMId(title: string) {
  return title.toLowerCase().split(" ").join("_");
}

const categories = [
  {
    id: 1,
    title: "burger",
    description: "test",
  },
  {
    id: 2,
    title: "kanapka",
    description: "ala",
  },
  {
    id: 3,
    title: "alka",
    description: "ala",
  },
  {
    id: 4,
    title: "nowe",
    description: "ala",
  },
  {
    id: 5,
    title: "stare",
    description: "ala",
  },
  {
    id: 6,
    title: "stare-2",
    description: "ala",
  },
  {
    id: 7,
    title: "stare-3",
    description: "ala",
  },
  {
    id: 8,
    title: "stare-4",
    description: "ala",
  },
  {
    id: 9,
    title: "stare-5",
    description: "ala",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function StoreDetailMenu() {
  const [activeCategory, setActiveCategory] = useState(null);

  const onScroll = (category: any) => {
    const elementId = makeTitleToDOMId(category.title);

    scroller.scrollTo(elementId, {
      containerId: "drawer-content",
      duration: 500,
      delay: 100,
      smooth: true,
      offset: -180,
    });

    setActiveCategory(category);
  };

  return (
    <>
      <div className="mt-4 lg:py-1 xl:py-0 border-b border-gray-300 px-8 pb-9 md:pb-14 lg:pb-16 2xl:pb-20 3xl:pb-24">
        <div className="flex flex-col md:flex-row">
          <nav className="sticky top-20 md:w-72 xl:w-3/12 mb-8 md:mb-0">
            <ol className="md:sticky md:top-20 flex md:flex-col overflow-x-auto z-10">
              {categories?.map((category) => (
                <li key={category.id} className="mx-4 md:mx-auto">
                  <Link
                    onClick={() => onScroll(category)}
                    spy={true}
                    offset={-120}
                    smooth={true}
                    duration={500}
                    to={makeTitleToDOMId(category.title)}
                    className={classNames(
                      "block font-semibold cursor-pointer py-3 lg:py-3.5 text-sm lg:text-base text-gray-700 uppercase",
                      activeCategory?.title === category.title
                        ? "underline underline-offset-4"
                        : ""
                    )}
                  >
                    {category.title}
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
          {/* End of section scroll spy menu */}

          <div className="md:w-9/12 md:ps-8 pt-0 lg:pt-2">
            {categories?.map((category) => (
              // @ts-ignore
              <Element
                name={makeTitleToDOMId(category.title)}
                key={category.title}
                id={makeTitleToDOMId(category.title)}
                className="mb-10"
              >
                <h2 className="text-lg md:text-xl lg:text-2xl text-heading font-bold mb-4">
                  {category.title}
                </h2>
                <div
                  className="text-heading h-screen bg-slate-600 text-sm leading-7 lg:text-base lg:leading-loose"
                  dangerouslySetInnerHTML={{
                    __html: category.description,
                  }}
                />
              </Element>
            ))}
          </div>
          {/* End of content */}
        </div>
      </div>
    </>
  );
}
