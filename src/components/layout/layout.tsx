import { SideNav } from "./side-nav";
import { TopNav } from "./top-nav";

interface LayoutProps {
  children?: any;
}

const DARK_MODE = false;

function Layout({ children }: LayoutProps) {
  return (
    <div
      className={`${
        DARK_MODE ? "dark" : ""
      } h-screen w-full flex overflow-hidden antialiased text-gray-800 bg-white`}
    >
      <SideNav />
      <div className="flex-1 flex flex-col">
        <TopNav />
        <main className="flex-grow flex min-h-0 border-t">{children}</main>
      </div>
    </div>
  );
}

export default Layout;
