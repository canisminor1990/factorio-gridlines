import { Color, LuaPlayer, LuaRenderObject, SurfaceIndex } from 'factorio:runtime';

import { formatPosition } from '../utils';

export const chunky = ({
  player,
  surface,
  topLeft: tl,
  bottomRight: br,
  size,
  offset,
  spacing,
  color,
  thickness,
  visible,
  drawOnGround,
}: {
  bottomRight: [number, number];
  color: Color;
  drawOnGround: boolean;
  offset: [number, number];
  player: LuaPlayer;
  size: [number, number];
  spacing: [number, number];
  surface: SurfaceIndex;
  thickness: number;
  topLeft: [number, number];
  visible: boolean;
}): LuaRenderObject[] => {
  const topLeft = formatPosition(tl, size, offset, 'topLeft');
  const bottomRight = formatPosition(br, size, offset, 'bottomRight');

  const lines: LuaRenderObject[] = [];
  for (let x = 0; x <= 1; x++) {
    const y = 1 - x;
    if (spacing[x] < size[x] / 2) {
      const squareEnd = spacing[0] !== 0 && spacing[x] >= 0 ? 1 : 0;
      for (let square = -1; square <= squareEnd; square += 2) {
        for (let xy = topLeft[y]; xy <= bottomRight[y]; xy += size[y]) {
          let iterDim = xy + square * spacing[y] * (spacing[x] >= 0 ? 1 : 0);
          let space = Math.max(0, Math.abs(spacing[x]) * 2);
          let dashLength = size[x] - space;
          if (spacing[x] < 0) {
            const tmp = dashLength;
            dashLength = Math.min(space, size[x]);
            space = Math.max(0, tmp);
          }
          const from: [number, number] = [0, 0];
          const to: [number, number] = [0, 0];
          from[x] = topLeft[x] + spacing[x];
          from[y] = iterDim;
          to[x] = bottomRight[x];
          to[y] = iterDim;
          lines.push(
            rendering.draw_line({
              color,
              dash_length: dashLength,
              draw_on_ground: drawOnGround,
              from,
              gap_length: space,
              players: [player],
              surface,
              to,
              visible,
              width: thickness,
            }),
          );
        }
      }
    }
  }
  return lines;
};
