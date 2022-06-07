import { drawImages } from "../utils";
import { baseMarker } from "./base-marker";

import icons from "@constants/icons";

export function drawSummaryMarker({ id, map, info, organization }) {
  const { ctx, config } = baseMarker({ info });

  // Set font
  ctx.font = "normal 10px arial";

  const [rate, jobs, users, training] = info.summary.split(";");

  // Rate text
  ctx.fillText(rate, config.textPaddingLeft + 12, config.textThirdLine + 2);

  // Jobs text
  ctx.fillText(jobs, config.textPaddingLeft + 44, config.textThirdLine + 2);

  // Users text
  ctx.fillText(users, config.textPaddingLeft + 73, config.textThirdLine + 2);

  // Training text
  ctx.fillText(
    training,
    config.textPaddingLeft + 104,
    config.textThirdLine + 2
  );

  const brandIcon = icons[organization].markers[info.brand];
  let brandYPos =
    info.brand === "kfc" ? config.textFirstLine + 4 : config.textFirstLine + 3;

  ctx.fillStyle = config.iconColor;

  drawImages(map, ctx, [
    { id: "brand", image: brandIcon, x: 0, y: brandYPos },
    {
      id: "star",
      image: icons.icons.star,
      x: config.textPaddingLeft,
      y: config.textThirdLine + 1,
    },
    {
      id: "jobs",
      image: icons.icons.jobs,
      x: config.textPaddingLeft + 32,
      y: config.textThirdLine + 2,
    },
    {
      id: "users",
      image: icons.icons.users,
      x: config.textPaddingLeft + 60,
      y: config.textThirdLine + 2,
    },
    {
      id: "training",
      image: icons.icons.training,
      x: config.textPaddingLeft + 89,
      y: config.textThirdLine + 2,
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
