import { useDispatch } from "react-redux";
import { ArrowLeftIcon } from "@heroicons/react/solid";

import { setStore } from "../../slices/store.slice";

export default function Drawer({ children, isOpen, setDrawerOpen }) {
  const dispatch = useDispatch();

  function onClose() {
    dispatch(setStore(null));
    setDrawerOpen(false);
  }

  return (
    <main
      className={`max-w-[60rem] absolute overflow-hidden inset-0 transform ease-in-out ${
        isOpen
          ? "z-50 transition-opacity opacity-100 duration-500 -translate-x-0"
          : "transition-all delay-500 opacity-0 -translate-x-full"
      }`}
    >
      <section
        className={`max-w-full left-0 absolute bg-white h-full delay-400 duration-500 ease-in-out transition-all transform" ${
          isOpen ? "-translate-x-0" : "-translate-x-full"
        }`}
      >
        <article
          id="drawer-content"
          className="relative w-screen max-w-full pb-10 flex flex-col overflow-y-auto h-full"
        >
          <button
            className="flex justify-center items-center absolute top-4 left-4 w-8 h-8 rounded-md bg-white "
            onClick={() => onClose()}
          >
            <ArrowLeftIcon
              className="h-6 w-6 text-gray-700"
              aria-hidden="true"
            />
          </button>
          {children}
        </article>
      </section>
    </main>
  );
}
