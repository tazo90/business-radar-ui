interface BaseLayoutProps {
  children?: any;
}

const BaseLayout = ({ children }: BaseLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col transition-colors duration-150">
      <div className="flex flex-1">
        <main className="w-full">
          <div className="overflow-y-auto h-full">{children}</div>
        </main>
      </div>
    </div>
  );
};
export default BaseLayout;
