import { HtmlTagWrapper } from './html-tag-wrapper';

export function SimpleMap() {
  console.log("TEST XXX");
  return (
    <div>
      Simple Map
    </div>
  )
}

export default HtmlTagWrapper(SimpleMap);
