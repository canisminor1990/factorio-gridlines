import { PlayerData, Storage } from '../types';

export const MODE_NAME = 'gridlines';
export const MODE_DIR = `__${MODE_NAME}__`;
export const SHORTCUT_NAME = `${MODE_NAME}-toggle`;
export const HOTKEY_EVENT_NAME = `${MODE_NAME}-toggle`;
export const LAYERS_COUNT = 3;
export const BLOCK_SIZE = 1e4;
export const PlayerSettings = (...names: (string | number)[]) => [MODE_NAME, ...names].join('-');
export const GlobalSettings = (...names: (string | number)[]) =>
  [MODE_NAME, 'global', ...names].join('-');

export const DEFAULT_PLAYER_DATA: PlayerData = {
  centres: [],
  covered_block_count: 0,
  delete_lines: [],
  grids: [],
};

export const DEFAULT_STORAGE: Storage = {
  enabled: false,
  init: false,
  mixed_surface_blocks: [],
  players: {},
  surfaces: {},
};
