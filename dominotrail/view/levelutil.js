"use strict";

dt.drawBackgroundOverlay = function(ctx, width, height) {
  ctx.save();
  ctx.globalAlpha = 0.2;
  for (var x = 0; x < width; ++x) {
    for (var y = 0; y < height; ++y) {
      dt.drawCellBackground(ctx, x, y, undefined, "#c0c0c0");
    }
  }
  ctx.restore();
};

dt.getCellCenter = function(x, y) {
  return new dt.Pos(dt.DCX * x + dt.INDENT_DCX[y % 2],
                    dt.DCY * y);
};

dt.drawCellBackground = function(ctx, x, y, fill, stroke, width) {
  ctx.save();
  ctx.beginPath();
  var center = dt.getCellCenter(x, y);
  var cx = center.x;
  var cy = center.y;
  ctx.moveTo(cx + dt.HX, cy + dt.HY);
  ctx.lineTo(cx + dt.HX, cy - dt.HY);
  ctx.lineTo(cx, cy - 2 * dt.HY);
  ctx.lineTo(cx - dt.HX, cy - dt.HY);
  ctx.lineTo(cx - dt.HX, cy + dt.HY);
  ctx.lineTo(cx, cy + 2 * dt.HY);
  ctx.closePath();
  if (fill !== undefined) {
    ctx.fillStyle = fill;
    ctx.fill();
  } else {
    var gr = ctx.createLinearGradient(cx + dt.HX, cy + dt.HY, cx - dt.HX, cy - dt.HY);
    gr.addColorStop(1, "#ffffff");
    gr.addColorStop(0, "#000000");
    ctx.fillStyle = gr;
    ctx.fill();
  }
  if (stroke !== undefined) {
    ctx.strokeStyle = stroke;
    if (width !== undefined) {
      ctx.lineWidth = width;
    }
    ctx.stroke();
  }
  ctx.restore();
};
