import { LuaSurface } from 'factorio:runtime';

import { BLOCK_SIZE } from '../const';
import { storage } from '../lib/storage';

export const blockify = (chunk: { position: [number, number]; surface: LuaSurface }) => {
  const block_pos = chunk.position.map((q) => Math.floor((q * 32) / BLOCK_SIZE)) as [
    number,
    number,
  ];
  const surface_index = chunk.surface.index;

  const surfaces = storage.surfaces[surface_index];
  const posKey = helpers.table_to_json(block_pos);
  if (surfaces && !surfaces[posKey]) {
    surfaces[posKey] = true;
    storage.mixed_surface_blocks.push({ block_pos: block_pos, surface_index: surface_index });
  }
};
