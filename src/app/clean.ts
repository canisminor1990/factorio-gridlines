import { storage } from '../lib/storage';
import { iterate_surfaces } from './iterate';

export const clean = () => {
  rendering.clear();
  storage.surfaces = {};
  storage.mixed_surface_blocks = [];
  storage.players = {};
  storage.init = true;
  iterate_surfaces();
};
