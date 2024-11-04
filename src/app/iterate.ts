import { LuaSurface } from 'factorio:runtime';

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
