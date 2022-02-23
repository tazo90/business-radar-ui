import React from 'react';
import { HtmlTagWrapper } from './html-tag-wrapper';

function TestWidget() {
  console.log("Test widget");
  return <div>ok</div>
}

export default HtmlTagWrapper('test', TestWidget);

