import icons from "@constants/icons";
import circle from "@assets/circle.png";
import circleSmall from "@assets/circle-small.png";

// Canvas utils
export function roundRect({
  ctx,
  x,
  y,
  w,
  h,
  r,
  stroke = false,
  strokeColor = "#ccc",
}) {
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
}

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
      });
    });
  };

  const promises = images.map((img) => addImage(map, img.id, img.image));
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
      });
    });
  };

  const promises = images.map((img) =>
    drawImage(map, ctx, img.image, img.x, img.y)
  );
  return Promise.all(promises);
}

/**
 * Returns cluster properties
 *
 * only_kfc: ["all", ["==", ["get", "brand"], "kfc"], "false"]
 * only_ph: ["all", ["==", ["get", "brand"], "ph"], "false"]
 * only_bk: ["all", ["==", ["get", "brand"], "bk"], "false"]
 *
 * Cluster properties idea based on article:
 * https://medium.com/@droushi/mapbox-cluster-icons-based-on-cluster-content-d462a5a3ad5c
 *
 * @param brands
 * @returns object of marker filters
 */
export function getClusterProperties(brands: string[]) {
  const properties: any = {};
  brands?.map(
    (brand: string) =>
      (properties[`only_${brand}`] = [
        "all",
        ["==", ["get", "brand"], brand],
        "false",
      ])
  );
  return properties;
}

/**
 * Returns images used in mapbox symbols in following format
 *
 * { id: "amrest", image: icons.amrest.markers.amrest },
 * { id: "kfc", image: icons.amrest.markers.kfc },
 * { id: "bk", image: icons.amrest.markers.bk },
 * { id: "ph", image: icons.amrest.markers.ph },
 *
 * @param organization
 * @param brands
 * @returns array of objects contained symbol images
 */
export function getMarkerImages(organization: string, brands: string[]) {
  const images = brands?.map((brand) => ({
    id: brand,
    image: icons[organization].markers[brand],
  }));

  return [
    { id: organization, image: icons[organization].markers[organization] },
    ...images,
    { id: "circle", image: circle },
    { id: "circle-small", image: circleSmall },
  ];
}

/**
 * Prepares cluster layout icon
 *
 * "case",
 * ["get", "only_kfc"],
 * "kfc",
 * ["get", "only_bk"],
 * "bk",
 * "amrest",
 *
 * @param brands
 */
export function getClusterLayerLayoutIconCheck(
  organization: string,
  brands: string[]
) {
  const brandFilters: any[] = [];
  brands.map((brand) => {
    brandFilters.push(["get", `only_${brand}`]);
    brandFilters.push(brand);
  });

  return ["case", ...brandFilters, organization];
}
