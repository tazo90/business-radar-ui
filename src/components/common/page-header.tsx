import Breadcrumb from "./breadcrumb";

export default function PageHeader({ children }) {
  return (
    <div className="border-b border-gray-200 px-4 py-1.5 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
      <div className="flex-1 min-w-0">
        <Breadcrumb />
      </div>
      <div className="mt-4 flex sm:mt-0 sm:ml-0">{children}</div>
    </div>
  );
}
