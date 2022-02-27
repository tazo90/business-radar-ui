import { withWidget } from './hooks/with-widget';

function TestWidget() {
  console.log("Test widget");
  return <div>ok</div>
}

export default withWidget('test', TestWidget);

