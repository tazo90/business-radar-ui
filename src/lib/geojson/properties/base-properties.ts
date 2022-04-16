export function baseProperties(feature: any) {
  let properties: any = {
    id: feature.id,
    name: feature.name,
    address: feature.address || feature.address_osm || feature.address_google,
    summary: "4,3;30;10;90%",
    brand: feature.brand.name.toLowerCase(),
    brand_full: feature.brand.fullName,
    country: feature.country.code,
    located_in_name: feature.located_in_name,
    phone: feature.phone,
  };

  if (feature.opening_hours?.regular) {
    properties.opening_hours = `${feature.opening_hours.regular.openFrom} - ${feature.opening_hours.regular.openTo}`;
  }

  return properties;
}
