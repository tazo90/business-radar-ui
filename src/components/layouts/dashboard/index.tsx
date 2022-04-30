import { SidebarDesktop } from "./sidebar-desktop";
import { SidebarMobile } from "./sidebar-mobile";
import { TopBar } from "./topbar";

interface DashboardLayoutProps {
  children?: any;
}

const DARK_MODE = false;

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className={`min-h-full ${DARK_MODE ? "dark" : ""}`}>
      <TopBar />
      <SidebarMobile />
      <div className="flex">
        <SidebarDesktop />
        {/* Main column */}
        <div
          className="flex flex-col w-full bg-gray-100"
          style={{ minHeight: "calc(100vh - 48px)" }}
        >
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </div>
  );
}
