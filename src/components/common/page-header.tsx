import Breadcrumb from "./breadcrumb";

type PageHeaderProps = {
  children?: React.ReactNode;
};

export default function PageHeader(props: PageHeaderProps) {
  return (
    <div className="bg-white border-b border-gray-200 px-4 py-2.5 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
      <div className="flex-1 min-w-0">
        <Breadcrumb />
      </div>
      {props.children && (
        <div className="mt-4 flex sm:mt-0 sm:ml-0">{props.children}</div>
      )}
    </div>
  );
}
