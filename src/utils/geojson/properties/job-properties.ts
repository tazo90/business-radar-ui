import { baseProperties } from "./base-properties";

export function jobProperties(feature: any) {
  let properties = baseProperties(feature.store);

  return {
    ...properties,
    title: feature.title,
  };
}
