import { withWidget } from "./hooks/with-widget";
import Messenger from "../../pages/messenger";

function MessengerWidget() {
  console.log("Messenger");
  return <Messenger />;
}

export default withWidget("messenger", MessengerWidget);
