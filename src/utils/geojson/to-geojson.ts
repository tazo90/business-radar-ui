import { baseProperties } from "./properties/base-properties";

export function toGeojson(featureCollection, getProperties = baseProperties) {
  return {
    type: "FeatureCollection",
    features: featureCollection.map((feature) => {
      // TODO: do in on backend, when scraped data
      // const name = (f.name || f.name_osm).toLowerCase().replace(`${f.brand.full_name.toLowerCase()} `, '');

      const properties = getProperties(feature);

      return {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [parseFloat(feature.lng), parseFloat(feature.lat)],
        },
        properties,
      };
    }),
  };
}
