import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import Drawer from "../ui/drawer";
import { SideNav } from "./side-nav";
import { TopNav } from "./top-nav";

interface LayoutProps {
  children?: any;
}

const DARK_MODE = false;

function Layout({ children }: LayoutProps) {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const { selectedStore } = useSelector((state: any) => state.store);

  useEffect(() => {
    if (selectedStore) {
      setDrawerOpen(true);
    }
  }, [selectedStore]);

  return (
    <div
      className={`${
        DARK_MODE ? "dark" : ""
      } h-screen w-full flex overflow-hidden antialiased text-gray-800 bg-white`}
    >
      <SideNav />
      <div className="flex-1 flex flex-col">
        <TopNav />
        <main className="relative flex-grow flex min-h-0 border-t">
          {children}
          <Drawer isOpen={isDrawerOpen} setDrawerOpen={setDrawerOpen}>
            test
          </Drawer>
        </main>
      </div>
    </div>
  );
}

export default Layout;
