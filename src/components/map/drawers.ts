import { roundRect, drawImages } from './utils';

import icons from '@constants/icons';

export function drawTooltip({ id, map, info }) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  const boxHeight = 64;
  const boxRadius = 10;
  const boxColor = 'rgba(255, 255, 255, 0.95)';

  const iconColor = '#636363';

  const textWidthOffset = 30;
  const textPaddingLeft = 38;

  const textFirstLine = 6;
  const textSecondLine = 22;
  const textThirdLine = 36;

  const dummyText = 'xxxxxxxxxxxxxxxxxxx';

  // Set font
  ctx.font = 'bold 12px arial';

  // Calculations
  const zeroLineWidth = ctx.measureText(dummyText).width;
  const firstLineWidth = ctx.measureText(info.brand_full).width;
  const secondLineWidth = ctx.measureText(info.name).width;
  const boxWidth = Math.max(zeroLineWidth, firstLineWidth, secondLineWidth) + textWidthOffset;

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
    strokeColor: '#B2B2B2'
  });

  // Set composition mode
  ctx.globalCompositeOperation = 'source-over';

  // Set styles
  ctx.fillStyle = '#000';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';

  // Gap text only for keeping a box in the correct width
  ctx.fillStyle = '#fff';
  ctx.fillText(dummyText, textPaddingLeft, textFirstLine);
  ctx.fillStyle = '#000';

  // Brand text
  ctx.fillText(info.brand_full, textPaddingLeft, textFirstLine);

  // Restaurant name
  ctx.fillText(info.name, textPaddingLeft, textSecondLine);

  // Set font
  ctx.font = 'normal 10px arial';

  const [rate, jobs, users, training] = info.summary.split(';');

  // Rate text
  ctx.fillText(rate, textPaddingLeft + 12, textThirdLine + 2);

  // Jobs text
  ctx.fillText(jobs, textPaddingLeft + 44, textThirdLine + 2);

  // Users text
  ctx.fillText(users, textPaddingLeft + 73, textThirdLine + 2);

  // Training text
  ctx.fillText(training, textPaddingLeft + 104, textThirdLine + 2);

  const brandIcon = icons.amrest.markers[info.brand];
  let brandYPos = info.brand === 'kfc' ? textFirstLine + 4 : textFirstLine + 3;

  ctx.fillStyle = iconColor;

  drawImages(map, ctx, [
    {id: 'brand', image: brandIcon, x: 0, y: brandYPos},
    {id: 'star', image: icons.icons.star, x: textPaddingLeft, y: textThirdLine + 1},
    {id: 'jobs', image: icons.icons.jobs, x: textPaddingLeft + 32, y: textThirdLine + 2},
    {id: 'users', image: icons.icons.users, x: textPaddingLeft + 60, y: textThirdLine + 2},
    {id: 'training', image: icons.icons.training, x: textPaddingLeft + 89, y: textThirdLine + 2},
    {id: 'closed', image: icons.icons.closed, x: boxWidth - 8, y: textFirstLine - 1},
  ]).then(() => {
    // Add generated image on the map
    var imageData = ctx.getImageData(0, 0, boxWidth + 10, boxHeight);

    if (!map.hasImage(id)) {
      map.addImage(id, imageData);
    }
  });
}
