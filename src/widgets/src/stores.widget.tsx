import dynamic from "next/dynamic";

import { withWidget } from "./hooks/with-widget";

const Stores = dynamic(() => import("@pages/apps/stores/index"));

function StoresWidget() {
  return (
    <main className="flex-grow flex flex-col min-h-0 border-t">
      <Stores />
    </main>
  );
}

export default withWidget("stores", StoresWidget);
