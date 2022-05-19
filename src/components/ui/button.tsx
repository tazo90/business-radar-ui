import { classNames } from "@lib/classnames";
import Link, { LinkProps } from "next/link";
import React, { forwardRef } from "react";

type SVGComponent = React.FunctionComponent<React.SVGProps<SVGSVGElement>>;

export type ButtonBaseProps = {
  color?: "primary" | "secondary" | "warn" | "add";
  size?: "base" | "sm" | "lg" | "fab" | "icon";
  loading?: boolean;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  StartIcon?: SVGComponent;
  EndIcon?: SVGComponent;
  shallow?: boolean;
};
export type ButtonProps = ButtonBaseProps &
  (
    | (Omit<JSX.IntrinsicElements["a"], "href"> & { href: LinkProps["href"] })
    | (JSX.IntrinsicElements["button"] & { href?: never })
  );

export const Button = forwardRef<
  HTMLAnchorElement | HTMLButtonElement,
  ButtonProps
>(function Button(props: ButtonProps, forwardedRef) {
  const {
    loading = false,
    color = "primary",
    size = "base",
    StartIcon,
    EndIcon,
    shallow,
    // attributes propagated from `HTMLAnchorProps` or `HTMLButtonProps`
    ...passThroughProps
  } = props;
  // Buttons are **always** disabled if we're in a `loading` state
  const disabled = props.disabled || loading;

  // If pass an `href`-attr is passed it's `<a>`, otherwise it's a `<button />`
  const isLink = typeof props.href !== "undefined";
  const elementType = isLink ? "a" : "button";

  const element = React.createElement(
    elementType,
    {
      ...passThroughProps,
      disabled,
      ref: forwardedRef,
      className: classNames(
        // base styles independent what type of button it is
        "inline-flex items-center shadow-sm",
        // different styles depending on size
        size === "base" && "px-3 py-1 text-xs leading-4 font-medium rounded-md",
        size === "sm" && "px-3 py-2 text-sm leading-4 font-medium rounded-md",
        size === "lg" && "px-4 py-2 text-base font-medium rounded-md",
        size === "icon" &&
          "group p-2 border rounded-sm border-transparent text-neutral-400 hover:border-gray-200 transition",
        // turn button into a floating action button (fab)
        size === "fab" ? "fixed" : "relative",
        size === "fab" &&
          "justify-center bottom-20 right-8 rounded-full p-4 w-14 h-14",

        // different styles depending on color
        color === "primary" &&
          (disabled
            ? "text-white bg-gray-400"
            : "bg-gray-100 border border-gray-300 text-gray-900 hover:bg-gray-200 focus:outline-none"),
        color === "secondary" &&
          (disabled
            ? "border border-transparent bg-gray-400 text-white"
            : "bg-green-600 border border-gray-300 text-white hover:bg-green-700/90 focus:outline-none"),
        color === "warn" &&
          (disabled
            ? "border border-transparent bg-gray-400 text-white"
            : "bg-red-500 border border-red-700 text-white hover:bg-red-700/80 focus:outline-none"),
        color === "add" &&
          (disabled
            ? "border border-transparent bg-gray-400 text-white"
            : "bg-purple-500 border border-purple-700 text-white hover:bg-purple-700/80 focus:outline-none"),
        // set not-allowed cursor if disabled
        loading ? "cursor-wait" : disabled ? "cursor-not-allowed" : "",
        props.className
      ),
      // if we click a disabled button, we prevent going through the click handler
      onClick: disabled
        ? (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
            e.preventDefault();
          }
        : props.onClick,
    },
    <>
      {StartIcon && (
        <StartIcon
          className={classNames(
            "inline",
            size === "icon" ? "h-5 w-5 " : "h-5 w-5 mr-1 -ml-1"
          )}
        />
      )}
      {props.children}
      {loading && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform">
          <svg
            className={classNames(
              "mx-4 h-5 w-5 animate-spin",
              color === "primary" ? "text-white dark:text-black" : "text-black"
            )}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      )}
      {EndIcon && (
        <EndIcon className="-mr-1 inline h-5 w-5 ltr:ml-2 rtl:mr-2" />
      )}
    </>
  );
  return props.href ? (
    <Link passHref href={props.href} shallow={shallow && shallow}>
      {element}
    </Link>
  ) : (
    element
  );
});

export default Button;
