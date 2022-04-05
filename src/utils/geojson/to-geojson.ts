import { baseProperties } from "./properties/base-properties";

function getStoreField(feature) {
  return feature;
}

export function toGeojson({
  data
  getProperties = baseProperties,
  getStore = getStoreField,
}) {
  return {
    type: "FeatureCollection",
    features: data.map((feature) => {
      // TODO: do in on backend, when scraped data
      // const name = (f.name || f.name_osm).toLowerCase().replace(`${f.brand.full_name.toLowerCase()} `, '');

      const properties = getProperties(feature);
      const store = getStore(feature);

      return {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [parseFloat(store.lng), parseFloat(store.lat)],
        },
        properties,
      };
    }),
  };
}
