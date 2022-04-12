import { Fragment } from "react";
import { Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/solid";

export function Modal({
  title,
  isOpen,
  onSubmit,
  onClose,
  children,
  footerSummary,
}) {
  function renderHeader() {
    return (
      <div className="flex justify-between border-b p-3">
        <h3
          className="text-lg leading-6 font-medium text-gray-600"
          id="modal-title"
        >
          {title}
        </h3>
        <button onClick={onClose}>
          <XIcon className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
    );
  }

  function renderFooter() {
    return (
      <div className="bg-gray-100 p-2 px-4 border-t border-gray-300">
        <div
          className={`flex items-center ${
            footerSummary ? "justify-between" : "justify-end"
          }`}
        >
          {footerSummary && footerSummary()}
          <div className="flex">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:w-auto sm:text-sm"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="ml-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-400 text-base font-medium text-white hover:bg-blue-500 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
              onClick={onSubmit}
            >
              Done
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <div
        className="fixed z-50 inset-0 overflow-y-auto"
        aria-labelledby="modal-base"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-end justify-center min-h-screen text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              aria-hidden="true"
              onClick={() => onClose()}
            />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all w-screen md:my-8 md:align-middle md:max-w-lg md:w-full">
              <div className="bg-white">
                <div className="sm:flex sm:items-start">
                  <div className="text-left w-full">
                    {renderHeader()}
                    {children}
                  </div>
                </div>
              </div>
              {renderFooter()}
            </div>
          </Transition.Child>
        </div>
      </div>
    </Transition.Root>
  );
}
