import { withWidget } from "./hooks/with-widget";
import Stores from "../../pages/stores/index";

function StoresWidget() {
  return (
    <main className="flex-grow flex flex-col min-h-0 border-t">
      <Stores />
    </main>
  );
}

export default withWidget("stores", StoresWidget);
