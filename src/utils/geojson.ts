export function toGeojson(featureCollection) {
  return {
    type: "FeatureCollection",
    features: featureCollection.map((f) => {
      // TODO: do in on backend, when scraped data
      // const name = (f.name || f.name_osm).toLowerCase().replace(`${f.brand.full_name.toLowerCase()} `, '');

      let properties: any = {
        id: f.id,
        name: f.name,
        address: f.address || f.address_osm || f.address_google,
        summary: "4,3;30;10;90%",
        brand: f.brand.name.toLowerCase(),
        brand_full: f.brand.full_name,
        country: f.country.code,
        located_in_name: f.located_in_name,
        phone: f.phone,
      };

      if (f.opening_hours?.regular) {
        properties.opening_hours = `${f.opening_hours.regular.openFrom} - ${f.opening_hours.regular.openTo}`;
      }

      return {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [parseFloat(f.lng), parseFloat(f.lat)],
        },
        properties,
      };
    }),
  };
}
