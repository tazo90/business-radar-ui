import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import MapGL, { NavigationControl, Popup } from 'react-map-gl';
import { useRouter } from 'next/router'
import maplibregl from 'maplibre-gl';
import * as turf from "@turf/turf";

import {
  pointLabelLayer,
  clusterLayer,
  clusterCountLayer,
  clusterCountBgLayer,
  unclusteredPointZoomedInLayer,
  unclusteredPointZoomedOutLayer
} from './layers';
import { addImages } from './utils';
import { drawTooltip } from './drawers';

import icons from '@constants/icons';

import circle from '@assets/circle.png';
import circleSmall from '@assets/circle-small.png';

import data from './data';

const MAX_ZOOM_LEVEL = 16;

function Map({ locations, cluster }) {
  const mapRef = useRef(null);
  const router = useRouter()

  const [map, setMap] = useState(null);
  const [tooltipInfo, setTooltipInfo] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [viewport, setViewport] = useState({
    longitude: 16.9896607,
    latitude: 51.1185381,
    zoom: 2,
    maxZoom: 18,
  });

  // const { locations, selectedLocation } = useSelector((state) => state.location);
  // const locations = data;
  const selectedLocation = null;

  useEffect(() => {
    if (mapLoaded && locations) {
      map.getSource('places').setData(locations);

      flyToBoundingBox();
    }
  }, [map]);

  useEffect(() => {
    if (selectedLocation) {
      // TODO: does backend store reversed coords?
      const latLng = [selectedLocation.longitude, selectedLocation.latitude];
      flyToLocation({ latLng, centerViewport: true });
    }
  }, [selectedLocation])

  function flyToBoundingBox() {
    if (!locations || locations.features.length === 0) {
      return;
    }

    const points = locations.features.map((feature) => feature.geometry.coordinates);
    if (points.length >= 2) {
      const line = turf.lineString(points)
      const bbox = turf.bbox(line);

      map.fitBounds(bbox, {
        padding: {top: 100, bottom: 100, left: 150, right: 150},
        linear: true,
        maxZoom: MAX_ZOOM_LEVEL
      })
    } else {
      const latLng = locations.features[0].geometry.coordinates;
      flyToLocation({ latLng })
    }
  }

  function flyToLocation({ latLng, centerViewport = false }) {
    if (map) {
      map.setZoom(MAX_ZOOM_LEVEL);

      // convert lngLat to pixels
      const pixelCoords = map.project(latLng)

      // set offset in pixels
      let offsetX = 0;
      if (centerViewport) {
        offsetX = 380;
      }

      // convert pixels to lngLat
      const latLngCoords = map.unproject([pixelCoords.x - offsetX, pixelCoords.y])
      const coords = [latLngCoords.lng, latLngCoords.lat]

      map.jumpTo({ center: coords })
    }
  }

  const onClick = useCallback((event) => {
    const feature = event.features[0];

    if (feature?.source !== 'places') return;

    const clusterId = feature.properties.cluster_id;
    if (clusterId) {
      const map = mapRef.current.getMap();
      // Handle cluster click
      map.getSource('places').getClusterExpansionZoom(
        clusterId,
        (err, zoom) => {
          if (err) return;

          map.easeTo({
            center: feature.geometry.coordinates,
            zoom: zoom
          })
        }
      )

    } else {
      // Handle non cluster click
      const { id, name } = feature.properties;
      const slugName = name.toLowerCase().split(' ').join('-');

      const locationLink = `/stores/${id}/${slugName}`;
      router.push(locationLink)

      // Scroll to marker index
      // const markerIndex = locations.features.findIndex((f) => f.properties.id === feature.properties.id);
      // TODO: get locationListRef from refs.store to scrollToItem
      // ref.current.scrollToItem(markerIndex);
    }
  }, []);

  const onHover = useCallback(event => {
    const { features } = event;
    const feature = features && features[0];

    const hoveredLayers = [
      'point-label',
      'unclustered-point-zoomed-in',
      'unclustered-point-zoomed-out'
    ];

    if (feature && hoveredLayers.includes(feature.layer.id)) {
      setTooltipInfo({
        feature,
        lng: feature.geometry.coordinates[0],
        lat: feature.geometry.coordinates[1],
      });
    } else if (tooltipInfo !== null) {
      setTooltipInfo(null);
    }
  }, [tooltipInfo]);

  function onMapLoad() {
    const map = mapRef.current.getMap();
    setMap(map);

    map.addSource('places', {
      type: 'geojson',
      data: locations,
      cluster: cluster,
      // clusterMaxZoom: 12,
      clusterRadius: 150,
      clusterMinPoints: 3,
      // clusterProperties: {
        // has_bk: ["any", ["==", ["get", "brand"], 'bk'], "false"],
      // }
    })

    addImages(map, [
      {id: 'kfc', image: icons.amrest.markers.kfc},
      {id: 'bk', image: icons.amrest.markers.bk},
      {id: 'ph', image: icons.amrest.markers.ph},
      {id: 'sbx', image: icons.amrest.markers.sbx},
      {id: 'bca', image: icons.amrest.markers.bca},
      {id: 'bf', image: icons.amrest.markers.bf},
      {id: 'tag', image: icons.amrest.markers.tag},
      {id: 'ssg', image: icons.amrest.markers.ssg},
      {id: 'kabb', image: icons.amrest.markers.kabb},
      {id: 'circle', image: circle},
      {id: 'circle-small', image: circleSmall},
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

    map.on('styleimagemissing', (e) => {
      const [name, brand, brand_full, summary] = e.id.split(' | ')

      if (!brand || map.hasImage(e.id)) return;

      const info = {
        name,
        brand,
        brand_full,
        summary
      };

      drawTooltip({
        id: e.id,
        map,
        info,
      })
    });

    setMapLoaded(true);
    
  }

  if (!locations) {
    return null;
  }

  return (
    <MapGL
      mapLib={maplibregl}
      initialViewState={{...viewport}}
      onLoad={onMapLoad}
      // onNativeClick={onClick}
      // onHover={onHover}
      // onViewportChange={setViewport}
      ref={mapRef}
      // width="100%"
      // height="100%"
      mapStyle="https://api.maptiler.com/maps/bright/style.json?key=olPbAXB9QkZuFSDG4x2V"
      style={{height: '93.5vh'}}
    >
        {tooltipInfo && (
          <Popup
            className="marker-popup"
            tipSize={5}
            offsetTop={-18}
            anchor="bottom"
            longitude={tooltipInfo.lng}
            latitude={tooltipInfo.lat}
            closeButton={false}
            closeOnClick={false}
            onClose={() => setTooltipInfo(null)}
          >
            <div>Brand: {tooltipInfo.feature.properties.brand}</div>
            <div>Title: {tooltipInfo.feature.properties.title}</div>
          </Popup>
        )}

        <NavigationControl style={{ padding: 20 }} />
    </MapGL>
  )

};

export default Map;
