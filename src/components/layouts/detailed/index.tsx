import PageHeader from "@components/common/page-header";
import PageMenu from "@components/common/page-menu";

export default function DetailedLayout({
  children,
  header,
  pageTitle,
  pageMenu,
  pageDescription = "",
}) {
  return (
    <div className="flex flex-col">
      <PageHeader>{header}</PageHeader>
      <div className="lg:grid lg:grid-cols-12">
        <PageMenu menu={pageMenu} />

        <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
          <div className="shadow sm:rounded-md sm:overflow-hidden">
            <div className="bg-white py-4 px-6 space-y-4 sm:py-4 sm:px-6">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {pageTitle}
                </h3>
                {pageDescription && (
                  <p className="mt-1 text-sm text-gray-500">
                    {pageDescription}
                  </p>
                )}
              </div>
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
