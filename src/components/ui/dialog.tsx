import { Fragment } from "react";
import { Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/solid";

type DialogHeaderProps = {
  title: React.ReactNode;
  onClose: () => void;
};

export function DialogHeader(props: DialogHeaderProps) {
  return (
    <div className="flex justify-between border-b py-3 px-6">
      <h3
        className="text-lg leading-6 font-medium text-gray-600"
        id="modal-title"
      >
        {props.title}
      </h3>
      <button onClick={props.onClose}>
        <XIcon className="h-5 w-5 text-gray-600" aria-hidden="true" />
      </button>
    </div>
  );
}

type DialogFooterProps = {
  children: React.ReactNode;
};

export function DialogFooter(props: DialogFooterProps) {
  return (
    <div className="bg-gray-100 py-2 px-5 border-t border-gray-300">
      <div className="flex items-center justify-end">
        <div className="flex">{props.children}</div>
      </div>
    </div>
  );
}

type DialogProps = {
  title: string;
  open: boolean;
  children: React.ReactNode;
  header?: React.ReactNode;
  onClose: () => void;
};

export function Dialog(props: DialogProps) {
  const {
    header = (
      <DialogHeader title={props.title} onClose={() => props.onClose()} />
    ),
  } = props;

  return (
    <Transition.Root show={props.open} as={Fragment}>
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
              onClick={() => props.onClose()}
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
                    {header}
                    {props.children}
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </div>
    </Transition.Root>
  );
}
