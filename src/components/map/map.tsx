import React, { useRef, useEffect, useState, useCallback } from "react";
import { Map as MapLibre, NavigationControl } from "maplibre-gl";
import { setStore } from "../../slices/store.slice";
import { useDispatch, useSelector } from "react-redux";

import * as turf from "@turf/turf";

import {
  pointLabelLayer,
  clusterLayer,
  clusterCountLayer,
  clusterCountBgLayer,
  unclusteredPointZoomedInLayer,
  unclusteredPointZoomedOutLayer,
} from "@components/map/layers";
import { addImages } from "./utils";
import { drawTooltip } from "./drawers";

import icons from "@constants/icons";

import circle from "@assets/circle.png";
import circleSmall from "@assets/circle-small.png";

const Map = ({ locations, cluster, storeList }) => {
  if (!locations) {
    return null;
  }

  const dispatch = useDispatch();

  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    // initialize map only once
    if (map.current) return;

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
  }, []);

  const onLoad = (map) => {
    map.addSource("places", {
      type: "geojson",
      data: locations,
      cluster: cluster,
      // clusterMaxZoom: 12,
      clusterRadius: 150,
      clusterMinPoints: 3,
      // clusterProperties: {
      // has_bk: ["any", ["==", ["get", "brand"], 'bk'], "false"],
      // }
    });

    addImages(map, [
      { id: "kfc", image: icons.amrest.markers.kfc },
      { id: "bk", image: icons.amrest.markers.bk },
      { id: "ph", image: icons.amrest.markers.ph },
      { id: "sbx", image: icons.amrest.markers.sbx },
      { id: "bca", image: icons.amrest.markers.bca },
      { id: "bf", image: icons.amrest.markers.bf },
      { id: "tag", image: icons.amrest.markers.tag },
      { id: "ssg", image: icons.amrest.markers.ssg },
      { id: "kabb", image: icons.amrest.markers.kabb },
      { id: "circle", image: circle },
      { id: "circle-small", image: circleSmall },
    ]).then(() => {
      map.addLayer(pointLabelLayer);

      if (cluster) {
        map.addLayer(clusterLayer);
        map.addLayer(clusterCountBgLayer);
        map.addLayer(clusterCountLayer);
        map.addLayer(unclusteredPointZoomedInLayer);
        map.addLayer(unclusteredPointZoomedOutLayer);
      }
    });

    map.on("styleimagemissing", (e) => {
      const [name, brand, brand_full, summary] = e.id.split(" | ");

      if (!brand || map.hasImage(e.id)) return;

      const info = {
        name,
        brand,
        brand_full,
        summary,
      };

      drawTooltip({
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
  };

  const onClick = (event) => {
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
  };

  const onMouseEnter = (map) => {
    map.getCanvas().style.cursor = "pointer";
  };

  const onMouseLeave = (map) => {
    map.getCanvas().style.cursor = "";
  };

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
