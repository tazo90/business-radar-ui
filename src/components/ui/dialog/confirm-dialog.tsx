import React, { PropsWithChildren, ReactNode } from "react";
import { ExclamationIcon } from "@heroicons/react/outline";
import { CheckIcon } from "@heroicons/react/solid";

import Button from "../button";
import { Dialog } from "./dialog";

export type ConfirmDialogProps = {
  confirmBtn?: ReactNode;
  confirmBtnText?: string;
  cancelBtnText?: string;
  onConfirm?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  title: string;
  variety?: "danger" | "warning" | "success";
};

export function ConfirmDialog(props: PropsWithChildren<ConfirmDialogProps>) {
  const {
    title,
    variety,
    confirmBtn = null,
    confirmBtnText = "Confirm",
    cancelBtnText = "Cancel",
    onConfirm,
    children,
  } = props;

  return (
    <Dialog.Content>
      <div className="flex px-4 pt-4">
        {variety && (
          <div className="mt-0.5 mr-3">
            {variety === "danger" && (
              <div className="mx-auto rounded-full bg-red-100 p-2 text-center">
                <ExclamationIcon className="h-5 w-5 text-red-600" />
              </div>
            )}
            {variety === "warning" && (
              <div className="mx-auto rounded-full bg-orange-100 p-2 text-center">
                <ExclamationIcon className="h-5 w-5 text-orange-600" />
              </div>
            )}
            {variety === "success" && (
              <div className="mx-auto rounded-full bg-green-100 p-2 text-center">
                <CheckIcon className="h-5 w-5 text-green-600" />
              </div>
            )}
          </div>
        )}
        <div>
          <h1 className="text-xl text-gray-900">{title}</h1>
          <span className="text-sm text-neutral-500">{children}</span>
        </div>
      </div>
      <div className="flex flex-row-reverse gap-x-2 p-4">
        <Dialog.Close onClick={onConfirm}>
          {confirmBtn || <Button color="primary">{confirmBtnText}</Button>}
        </Dialog.Close>
        <Dialog.Close>
          <Button color="secondary">{cancelBtnText}</Button>
        </Dialog.Close>
      </div>
    </Dialog.Content>
  );
}
