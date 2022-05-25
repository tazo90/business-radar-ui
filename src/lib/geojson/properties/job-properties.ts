import { baseProperties } from "./base-properties";

export function jobProperties(feature: any) {
  let properties = baseProperties(feature.store);

  return {
    ...properties,
    title: feature.title,
    brand: feature.brand?.name.toLowerCase(),
    brand_full: feature.brand?.fullName,
    country: feature.country?.code,
    // JobId is required to make detail page works correctly
    jobId: feature.id,
  };
}
