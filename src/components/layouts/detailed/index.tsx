import PageHeader from "@components/common/page-header";
import PageMenu from "@components/common/page-menu";
import { classNames } from "@lib/classnames";
import { Toaster } from "react-hot-toast";
import { capitalize } from "@lib/strings";
import { DocumentTextIcon, LocationMarkerIcon } from "@heroicons/react/solid";

const icons = {
  stores: LocationMarkerIcon,
  jobs: DocumentTextIcon,
};

type MenuHeaderProps = {
  app: string;
  subtitle?: string;
};

export const MenuHeader = ({ app, subtitle }: MenuHeaderProps) => {
  if (!app) {
    return null;
  }

  const Icon = icons[app];
  return (
    <div className="flex items-center">
      <div className="flex p-2 text-gray-900 text-xs font-medium bg-yellow-400 rounded-md">
        <Icon className="h-4 w-4" />
      </div>
      <div className="flex flex-col pl-3 leading-none">
        <span>{capitalize(app)}</span>
        {subtitle && <span className="text-xs">{subtitle}</span>}
      </div>
    </div>
  );
};

type DetailedLayoutProps = {
  children: React.ReactNode;
  app?: string;
  subtitle?: string;
  pageTitle?: string;
  pageMenu: any;
  pageMenuHeader?: any;
  pageAction?: React.ReactNode;
  pageDescription?: string;
  fullScreen?: boolean;
};

export default function DetailedLayout(props: DetailedLayoutProps) {
  return (
    <div className="flex flex-col">
      <Toaster position="bottom-right" />
      <PageHeader />
      <div
        className={classNames(
          props.fullScreen ? "" : "pt-6 pb-20",
          "lg:grid lg:grid-cols-12"
        )}
      >
        <PageMenu
          menu={props.pageMenu}
          header={
            props.pageMenuHeader || (
              <MenuHeader app={props.app} subtitle={props.subtitle} />
            )
          }
          fullScreen={props.fullScreen}
        />

        <div
          className={classNames(
            props.fullScreen ? "lg:col-span-10" : "lg:col-span-9",
            "space-y-6 sm:px-6 lg:px-0"
          )}
        >
          <div className="sm:rounded-md sm:overflow-hidden">
            {props.pageTitle && (
              <div className="bg-white py-4 px-6 space-y-4 sm:py-4 sm:px-6">
                <div className="flex justify-between">
                  <div className="flex flex-col">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      {props.pageTitle}
                    </h3>
                    {props.pageDescription && (
                      <p className="mt-1 text-sm text-gray-500">
                        {props.pageDescription}
                      </p>
                    )}
                  </div>
                  {props.pageAction}
                </div>
              </div>
            )}
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
}
