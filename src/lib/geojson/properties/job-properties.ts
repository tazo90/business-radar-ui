import { baseProperties } from "./base-properties";

export function jobProperties(feature: any) {
  let properties = baseProperties(feature.store);

  return {
    ...properties,
    title: feature.title,
    // JobId is required to make detail page works correctly
    jobId: feature.id,
  };
}
