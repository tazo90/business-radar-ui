import { baseProperties } from "./base-properties";

export function jobProperties(feature: any) {
  let properties = baseProperties(feature.store);

  const { store, profession_name } = feature;

  const jobTitle = profession_name.replace("Eksternal - ", "");
  const brandIndex = jobTitle.toUpperCase().indexOf(store.brand.name);

  let formattedJobTitle = jobTitle;
  if (brandIndex >= 0) {
    formattedJobTitle = jobTitle.slice(0, brandIndex);
  }

  return {
    ...properties,
    jobTitle: formattedJobTitle,
  };
}
