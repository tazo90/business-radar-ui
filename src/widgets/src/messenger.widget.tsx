import { withWidget } from "./hooks/with-widget";
import Messenger from "@pages/debug/messenger";

function MessengerWidget() {
  console.log("Messenger");
  return <Messenger />;
}

export default withWidget("messenger", MessengerWidget);
