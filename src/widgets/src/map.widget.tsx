import { withWidget } from "./hooks/with-widget";
import Stores from "../../pages/stores/index";

function MapWidget() {
  return (
    <main className="flex-grow flex min-h-0 border-t">
      <Stores />
    </main>
  );
}

export default withWidget("map", MapWidget);
