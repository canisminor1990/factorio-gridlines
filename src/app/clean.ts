import { MODE_NAME } from '../const';
import { storage } from '../lib/storage';

export const clean = () => {
  rendering.clear(MODE_NAME);
  storage.surfaces = {};
  storage.mixed_surface_blocks = [];
  storage.players = {};
  storage.init = true;
};
