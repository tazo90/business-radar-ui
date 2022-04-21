import PageHeader from "@components/common/page-header";
import PageMenu from "@components/common/page-menu";

export default function DetailedLayout({ children, header, pageMenu }) {
  return (
    <div className="flex flex-col">
      <PageHeader>{header}</PageHeader>
      <div className="lg:grid lg:grid-cols-12">
        <PageMenu menu={pageMenu} />

        <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
          {children}
        </div>
      </div>
    </div>
  );
}
