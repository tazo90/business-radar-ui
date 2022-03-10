import { useDispatch, useSelector } from "react-redux";

import { setStore } from "../../slices/store.slice";

export default function Drawer({ children, isOpen, setDrawerOpen }) {
  const dispatch = useDispatch();
  const store = useSelector(
    (state: any) => state.store.selectedStore?.properties
  );

  if (!store) {
    return null;
  }

  function onClose() {
    dispatch(setStore(null));
    setDrawerOpen(false);
  }

  return (
    <main
      className={`max-w-[52rem] absolute overflow-hidden inset-0 transform ease-in-out ${
        isOpen
          ? "transition-opacity opacity-100 duration-500 -translate-x-0"
          : "transition-all delay-500 opacity-0 -translate-x-full"
      }`}
    >
      <section
        className={`max-w-full left-0 absolute bg-white h-full delay-400 duration-500 ease-in-out transition-all transform" ${
          isOpen ? "-translate-x-0" : "-translate-x-full"
        }`}
      >
        <article className="relative w-screen max-w-full pb-10 flex flex-col space-y-6 overflow-y-auto h-full">
          <button className="w-12 h-12 bg-red-500" onClick={() => onClose()}>
            Back
          </button>
          <header className="p-4 font-bold text-lg">{store.name}</header>
          {children}
        </article>
      </section>
    </main>
  );
}
