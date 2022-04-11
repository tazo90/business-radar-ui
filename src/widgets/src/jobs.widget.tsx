import { withWidget } from "./hooks/with-widget";
import Jobs from "../../pages/apps/jobs/index";

function JobsWidget() {
  return (
    <main className="flex-grow flex flex-col min-h-0 border-t">
      <Jobs />
    </main>
  );
}

export default withWidget("jobs", JobsWidget);
