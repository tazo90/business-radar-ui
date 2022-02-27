import * as ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from "react-query";

// Import css
import "../../styles/globals.css";
import 'maplibre-gl/dist/maplibre-gl.css';

function parseValue(value: any) {
  if (value === '' || value === 'true') {
    return true;
  }

  if (value === 'false') {
    return false;
  }

  if (Number(value).toString() === value) {
    return Number(value);
  }

  return value;
}

function parseKey(key: string) {
  const parts = key.split('-');
  const newParts = [parts[0]];
  for (let i = 1; i < parts.length; i++) {
    const firstLetter = parts[i].slice(0, 1);
    const restOfLetters = parts[i].slice(1);
    const newPart = firstLetter.toUpperCase() + restOfLetters;
    newParts.push(newPart);
  }
  return newParts.join('');
}

function attrToObj(attrs: NamedNodeMap) {
  const attrsObj: { [key: string]: unknown } = {};
  const length = attrs.length;
  for (let i = 0; i < length; i++) {
    const { name, value } = attrs[i];
    attrsObj[parseKey(name)] = parseValue(value);
  }
  return attrsObj;
}

export function withWidget(WidgetId: string, Component: (props?: any) => JSX.Element) {
  const el = document.getElementById(WidgetId);
  const attrs = el.attributes;

  const props = attrToObj(attrs);
  
  // init react query
  const queryClient = new QueryClient()

  ReactDOM.render(
    <QueryClientProvider client={queryClient}>
      <Component {...props} />
    </QueryClientProvider>, 
    el
  );
}
