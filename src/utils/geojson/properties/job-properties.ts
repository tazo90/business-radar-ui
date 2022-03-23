import { baseProperties } from "./base-properties";

export function jobProperties(feature: any) {
  let properties = baseProperties(feature);

  const { brand, is_manager, job_category_name, profession_name, title } =
    feature;

  const jobTitle = profession_name.replace("Eksternal - ", "");
  const brandIndex = jobTitle.toUpperCase().indexOf(brand.name);
  const formattedJobTitle = jobTitle.slice(0, brandIndex);

  return {
    ...properties,
    jobTitle: formattedJobTitle,
  };
}
