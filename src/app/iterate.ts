import { LuaSurface } from 'factorio:runtime';

import { BLOCK_SIZE } from '../const';
import { storage } from '../lib/storage';
import { fromXY } from '../utils';
import { blockify } from './blockify';

export const iterate_surface_chunks = (surface: LuaSurface): number => {
  let i = 0;
  for (const chunk of surface.get_chunks()) {
    i++;
    blockify({ position: fromXY(chunk), surface: surface });
  }
  return i;
};

export const iterate_surfaces = (): number => {
  let i = 0;
  for (const surface of Object.values(game.surfaces)) {
    i += iterate_surface_chunks(surface);
  }
  return i;
};

// Incrementally discover blocks around a center chunk within a square radius.
// Returns how many new blocks were added (up to limit).
export const blockify_square_around = (
  surface: LuaSurface,
  centerChunk: [number, number],
  radius: number,
  limit: number,
): number => {
  let added = 0;
  const surfaces = storage.surfaces[surface.index];
  if (!surfaces) return 0;

  for (let dy = -radius; dy <= radius; dy++) {
    for (let dx = -radius; dx <= radius; dx++) {
      if (added >= limit) return added;
      const chunkPos: [number, number] = [centerChunk[0] + dx, centerChunk[1] + dy];

      // Compute block position like in blockify()
      const block_pos = chunkPos.map((q) => Math.floor((q * 32) / BLOCK_SIZE)) as [number, number];
      const posKey = helpers.table_to_json(block_pos);
      if (!surfaces[posKey]) {
        surfaces[posKey] = true;
        storage.mixed_surface_blocks.push({ block_pos, surface_index: surface.index });
        added++;
      }
    }
  }

  return added;
};
