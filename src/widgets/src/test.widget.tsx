import { withWidget } from "./hooks/with-widget";
import Test from "../../pages/test";

function TestWidget() {
  console.log("Test widget");
  return <Test />;
}

export default withWidget("test", TestWidget);
