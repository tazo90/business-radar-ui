export function capitalize(text) {
  return text
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export function toGeojson(featureCollection) {
  return {
    type: 'FeatureCollection',
    features: featureCollection.map((f) => {
      // TODO: do in on backend, when scraped data
      // const name = (f.name || f.name_osm).toLowerCase().replace(`${f.brand.full_name.toLowerCase()} `, '');
      return {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [
            parseFloat(f.longitude),
            parseFloat(f.latitude)
          ]
        },
        properties: {
          id: f.id,
          name: f.name,
          address: f.address || f.address_osm || f.address_google,
          summary: '4,3;30;10;90%',
          brand: f.brand.name.toLowerCase(),
          brand_full: f.brand.full_name,
          country: f.country.code,
          located_in_name: f.located_in_name,
          phone: f.phone,
          opening_hours: f.opening_hours.regular && `${f.opening_hours.regular.openFrom} - ${f.opening_hours.regular.openTo}`
        }
      }
    })
  }
}

// Canvas utils
export function roundRect({ ctx, x, y, w, h, r, stroke = false, strokeColor = '#ccc' }) {
  if (w < 2 * r) r = w / 2;
  if (h < 2 * r) r = h / 2;

  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
  ctx.fill();

  if (stroke) {
    ctx.strokeStyle = strokeColor;
    ctx.stroke();
  }


  return ctx;
};

export function addImages(map, images) {
  const addImage = (map, id, file) => {
    return new Promise((resolve, reject) => {
      map.loadImage(file, (error, image) => {
        if (error) {
          reject(error);
          return;
        }

        map.addImage(id, image);
        resolve(image);
      })
    })
  }

  const promises = images.map(img => addImage(map, img.id, img.image))
  return Promise.all(promises);
}

export function drawImages(map, ctx, images) {
  const drawImage = (map, ctx, file, x, y) => {
    return new Promise((resolve, reject) => {
      map.loadImage(file, (error, image) => {
        if (error) {
          reject(error);
          return;
        }

        ctx.drawImage(image, x, y);
        resolve(image);
      })
    })
  }

  const promises = images.map(img => drawImage(map, ctx, img.image, img.x, img.y))
  return Promise.all(promises);
}
