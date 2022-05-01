import PageHeader from "@components/common/page-header";
import PageMenu from "@components/common/page-menu";

type DetailedLayoutProps = {
  children: React.ReactNode;
  pageTitle?: string;
  pageMenu: any;
  pageAction?: React.ReactNode;
  pageDescription?: string;
};

export default function DetailedLayout(props: DetailedLayoutProps) {
  return (
    <div className="flex flex-col">
      <PageHeader />
      <div className="lg:grid lg:grid-cols-12">
        <PageMenu menu={props.pageMenu} />

        <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
          <div className="shadow sm:rounded-md sm:overflow-hidden">
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
