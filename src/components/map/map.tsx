import React, { useRef, useEffect } from "react";
import { Map as MapLibre, NavigationControl, Marker } from "maplibre-gl";
import { useDispatch, useSelector } from "react-redux";

import * as turf from "@turf/turf";

import {
  pointLabelLayer,
  clusterLayer,
  clusterCountLayer,
  clusterCountBgLayer,
  unclusteredPointZoomedInLayer,
  unclusteredPointZoomedOutLayer,
} from "@components//map/layers";
import { addImages, getClusterProperties, getMarkerImages } from "./utils";
import { setStore } from "@slices/store.slice";

import { drawStoreMarker } from "./markers/store-marker";

const MAX_ZOOM_LEVEL = 16;

const Map = ({ locations, storeList, organization, brands }) => {
  if (!locations) {
    return null;
  }

  const dispatch = useDispatch();
  const { selectedStore } = useSelector((state: any) => state.store);
  const { userLocation } = useSelector((state: any) => state.location);

  const organizationBrands = Object.keys(brands?.data);

  const map = useRef(null);
  const mapContainer = useRef(null);

  useEffect(() => {
    // initialize map only once
    if (map.current) return;

    if (mapContainer.current) {
      map.current = new MapLibre({
        container: mapContainer.current,
        style:
          "https://api.maptiler.com/maps/bright/style.json?key=olPbAXB9QkZuFSDG4x2V",
        center: [17.031421166039646, 51.10925017838582],
        zoom: 13,
        maxZoom: 18,
      });

      // map.current.addControl(new NavigationControl());

      map.current.on("load", () => onLoad(map.current));
    }
  }, [mapContainer, map]);

  useEffect(() => {
    if (locations) {
      flyToBoundingBox();
    }
  }, [locations]);

  useEffect(() => {
    if (selectedStore) {
      flyToLocation(selectedStore.geometry.coordinates);
    }
  }, [selectedStore]);

  useEffect(() => {
    if (userLocation !== null) {
      const { coordinates } = userLocation.geometry;
      new Marker().setLngLat(coordinates).addTo(map.current);
      flyToLocation(coordinates);
    }
  }, [userLocation]);

  function onLoad(map) {
    map.addSource("places", {
      type: "geojson",
      data: locations,
      cluster: true,
      // clusterMaxZoom: 12,
      clusterRadius: 150,
      clusterMinPoints: 3,
      clusterProperties: { ...getClusterProperties(organizationBrands) },
    });

    addImages(map, getMarkerImages(organization, organizationBrands)).then(
      () => {
        map.addLayer(pointLabelLayer);

        map.addLayer(clusterLayer);
        map.addLayer(clusterCountBgLayer);
        map.addLayer(clusterCountLayer);
        map.addLayer(unclusteredPointZoomedInLayer);
        map.addLayer(unclusteredPointZoomedOutLayer);
      }
    );

    map.on("styleimagemissing", (e) => {
      const [name, brand, brand_full, summary] = e.id.split(" | ");

      if (!brand || map.hasImage(e.id)) return;

      const info = {
        name,
        brand,
        brand_full,
        summary,
      };

      drawStoreMarker({
        id: e.id,
        map,
        info,
      });
    });

    // Register on click events
    map.on("click", "point-label", onClick);
    map.on("click", "clusters", onClick);
    map.on("click", "unclustered-point-zoomed-out", onClick);

    // Register mouse events
    map.on("mouseenter", "point-label", () => onMouseEnter(map));
    map.on("mouseenter", "clusters", () => onMouseEnter(map));
    map.on("mouseenter", "unclustered-point-zoomed-out", () =>
      onMouseEnter(map)
    );

    map.on("mouseleave", "point-label", () => onMouseLeave(map));
    map.on("mouseleave", "clusters", () => onMouseLeave(map));
    map.on("mouseleave", "unclustered-point-zoomed-out", () =>
      onMouseLeave(map)
    );
  }

  function onClick(event) {
    const feature = event.features[0];

    if (feature?.source !== "places") return;

    const clusterId = feature.properties.cluster_id;
    if (clusterId) {
      // Handle cluster click
      map.current
        .getSource("places")
        .getClusterExpansionZoom(clusterId, (err, zoom) => {
          if (err) return;

          map.current.easeTo({
            center: feature.geometry.coordinates,
            zoom: zoom,
          });
        });
    } else {
      // Handle non cluster click
      const featureIndex = locations.features.findIndex(
        (loc: any) => loc.properties.id === feature.properties.id
      );

      // Display marker details and scroll to it
      const location = locations.features[featureIndex];
      dispatch(setStore(location));
      storeList.current.scrollToItem(featureIndex);
    }
  }

  function onMouseEnter(map) {
    map.getCanvas().style.cursor = "pointer";
  }

  function onMouseLeave(map) {
    map.getCanvas().style.cursor = "";
  }

  function flyToLocation(coords) {
    if (!map.current) return;

    const _map = map.current;

    _map.setZoom(MAX_ZOOM_LEVEL);

    // convert lngLat to pixels
    const pixelCoords = _map.project(coords);

    // convert pixels to lngLat
    const latLngCoords = _map.unproject([pixelCoords.x, pixelCoords.y]);
    const centerCoords = [latLngCoords.lng, latLngCoords.lat];

    _map.jumpTo({ center: centerCoords });
  }

  function flyToBoundingBox() {
    if (locations.features.length === 0) {
      return;
    }

    const points = locations.features.map(
      (feature: any) => feature.geometry.coordinates
    );
    if (points.length >= 2) {
      const line = turf.lineString(points);
      const bbox = turf.bbox(line);

      map.current.fitBounds(bbox, {
        padding: { top: 100, bottom: 100, left: 150, right: 150 },
        linear: true,
        maxZoom: MAX_ZOOM_LEVEL,
      });
    } else {
      const latLng = locations.features[0].geometry.coordinates;
      flyToLocation(latLng);
    }
  }

  return (
    <div
      ref={mapContainer}
      style={{
        height: "100vh",
      }}
    />
  );
};

export default Map;
