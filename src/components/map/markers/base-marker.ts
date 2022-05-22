import { roundRect } from "../utils";

const MARKER_CONFIG = {
  boxWidth: null,
  boxHeight: 64,
  boxRadius: 10,
  boxColor: "rgba(255, 255, 255, 0.95)",
  iconColor: "#636363",
  textWidthOffset: 35,
  textPaddingLeft: 38,
  textFirstLine: 6,
  textSecondLine: 22,
  textThirdLine: 36,
  dummyText: "xxxxxxxxxxxxxxxxxxx",
};

export function baseMarker({ info }) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const {
    boxHeight,
    boxRadius,
    boxColor,
    textWidthOffset,
    textPaddingLeft,
    textFirstLine,
    textSecondLine,
  } = MARKER_CONFIG;

  const dummyText = "xxxxxxxxxxxxxxxxxxx";

  // Set font
  ctx.font = "bold 12px arial";

  // Calculations
  const zeroLineWidth = ctx.measureText(dummyText).width;
  const firstLineWidth = ctx.measureText(info.brand_full).width;
  const secondLineWidth = ctx.measureText(info.name).width;

  const boxWidth =
    Math.max(zeroLineWidth, firstLineWidth, secondLineWidth) + textWidthOffset;

  // Draw rounded background
  ctx.fillStyle = boxColor;
  roundRect({
    ctx,
    x: 10,
    y: 0,
    w: boxWidth,
    h: boxHeight - 12,
    r: boxRadius,
    stroke: true,
    strokeColor: "#B2B2B2",
  });

  // Set composition mode
  ctx.globalCompositeOperation = "source-over";

  // Set styles
  ctx.fillStyle = "#000";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";

  // Gap text only for keeping a box in the correct width
  ctx.fillStyle = "#fff";
  ctx.fillText(dummyText, textPaddingLeft, textFirstLine);
  ctx.fillStyle = "#000";

  // Brand text
  ctx.fillText(info.brand_full, textPaddingLeft, textFirstLine);

  // Restaurant name
  ctx.fillText(info.name, textPaddingLeft, textSecondLine);

  return {
    ctx,
    config: {
      ...MARKER_CONFIG,
      boxWidth,
    },
  };
}
