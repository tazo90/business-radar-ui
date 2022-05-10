// TODO: get rid of any types

export function pick(obj: any, ...props: any) {
  return props.reduce((result: any, prop: string) => {
    result[prop] = obj[prop];
    return result;
  }, {});
}

export function omit(obj: any, ...props: any) {
  const result = { ...obj };
  props.forEach((prop: string) => {
    delete result[prop];
  });
  return result;
}

export function isEmpty(value: any) {
  return ["", undefined, null].includes(value);
}
