import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { withWidget } from "./hooks/with-widget";
import Stores from "../../pages/stores/index";
import Drawer from "../../components/ui/drawer";

function MapWidget() {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const { selectedStore } = useSelector((state: any) => state.store);

  useEffect(() => {
    if (selectedStore) {
      setDrawerOpen(true);
    }
  }, [selectedStore]);

  return (
    <main className="flex-grow flex flex-col min-h-0 border-t">
      <Stores />
    </main>
  );
}

export default withWidget("map", MapWidget);
