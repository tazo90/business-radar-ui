import { SidebarHeader } from "./sidebar-header";
import { SidebarContent } from "./sidebar-content";

export function Sidebar() {
  return (
    <aside className="sidebar w-64 md:shadow transform -translate-x-full md:translate-x-0 transition-transform duration-150 ease-in bg-gray-800">
      <SidebarHeader />
      <SidebarContent />
    </aside>
  );
}
