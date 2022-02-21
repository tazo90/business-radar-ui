export const pointLabelLayer = {
  id: 'point-label',
  type: 'symbol',
  source: 'places',
  minzoom: 8,
  layout: {
    'icon-image': [
      'concat',
        ['get', 'name'],
        ' | ',
        ['get', 'brand'],
        ' | ',
        ['get', 'brand_full'],
        ' | ',
        ['get', 'summary'],
    ],
    'icon-size': [
      'interpolate',
      [
          'exponential',
          1.5
      ],
      [
          'zoom'
      ],
      12, 0.75,
      14, 0.8,
      18, 1,
      20, 1.2
    ],
    'icon-allow-overlap': true,
    'icon-ignore-placement': true,
    'icon-padding': 0,
    'icon-offset': [0, -30],
    // 'icon-offset': [100, 0],
    'icon-rotation-alignment': 'map',
  },
};

export const clusterLayer = {
  id: 'clusters',
  source: 'places',
  type: 'symbol',
  // maxzoom: 12,
  filter: ['has', 'point_count'],
  layout: {
    'icon-image': 'kfc',
    'icon-size': 1.2,
    'icon-ignore-placement': true,
  },
};


export const clusterCountBgLayer = {
  id: 'cluster-count-bg',
  type: 'symbol',
  source: 'places',
  filter: ['has', 'point_count'],
  // maxzoom: 12,
  // paint: {
  //   'circle-radius': 8,
  //   'circle-color': '#51bbd6',
  //   'circle-translate': [15, -15],
  // },
  paint: {
    'icon-translate': [15, -15],
  },
  layout: {
    'icon-image': 'circle',
    'icon-size': 1.2,
    'icon-ignore-placement': true,
  }
};

export const clusterCountLayer = {
  id: 'cluster-count',
  source: 'places',
  type: 'symbol',
  // maxzoom: 12,
  filter: ['has', 'point_count'],
  paint: {
    'text-translate': [15, -15],
  },
  layout: {
    'text-field': '{point_count_abbreviated}',
    'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
    'text-size': 11,
    'text-ignore-placement': true,
  },
};

export const unclusteredPointZoomedInLayer = {
  id: 'unclustered-point-zoomed-in',
  type: 'symbol',
  source: 'places',
  minzoom: 8,
  filter: ['!', ['has', 'point_count']],
  layout: {
    // 'icon-image': ['get', 'brand'], // TODO: use it when images will be resized
    'icon-image': 'circle-small',
    // 'icon-size': 0.06,
    'icon-allow-overlap': true,
  },
}

export const unclusteredPointZoomedOutLayer = {
  id: 'unclustered-point-zoomed-out',
  type: 'symbol',
  source: 'places',
  maxzoom: 8,
  filter: ['!', ['has', 'point_count']],
  layout: {
    'icon-image': ['get', 'brand'], // TODO: use it when images will be resized
    // 'icon-image': 'kfc',
    // 'icon-size': 0.06,
    'icon-allow-overlap': true,
  },
}