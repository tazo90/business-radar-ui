import { drawImages } from "../utils";
import { baseMarker } from "./base-marker";

import icons from "@constants/icons";

export function drawStoreMarker({ id, map, info, organization }) {
  const { ctx, config } = baseMarker({ info });

  // Set font
  ctx.font = "normal 12px arial";

  // const [rate, jobs, users, training] = info.summary.split(";");
  const [rate, hours] = "3.4;Until 20:00".split(";");

  // Hours text
  ctx.fillText(hours, config.textPaddingLeft, config.textThirdLine + 2);

  ctx.font = "bold 12px arial";

  // Rate text
  ctx.fillText(rate, config.textPaddingLeft + 70, config.textThirdLine + 2);

  const brandIcon = icons[organization].markers[info.brand];
  let brandYPos =
    info.brand === "kfc" ? config.textFirstLine + 4 : config.textFirstLine + 3;

  ctx.fillStyle = config.iconColor;

  drawImages(map, ctx, [
    { id: "brand", image: brandIcon, x: 0, y: brandYPos },
    {
      id: "star",
      image: icons.icons.star,
      x: config.textPaddingLeft + 90,
      y: config.textThirdLine + 1,
    },
    {
      id: "closed",
      image: icons.icons.closed,
      x: config.boxWidth - 8,
      y: config.textFirstLine - 1,
    },
  ]).then(() => {
    // Add generated image on the map
    var imageData = ctx.getImageData(
      0,
      0,
      config.boxWidth + 10,
      config.boxHeight
    );

    if (!map.hasImage(id)) {
      map.addImage(id, imageData);
    }
  });
}
