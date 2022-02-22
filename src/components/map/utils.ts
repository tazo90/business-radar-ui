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
