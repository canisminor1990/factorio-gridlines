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
  ui_overrides: {},
};

export const DEFAULT_STORAGE: Storage = {
  enabled: false,
  init: false,
  mixed_surface_blocks: [],
  players: {},
  surfaces: {},
};

// GUI element names
export const GUI_BUTTON_NAME = `${MODE_NAME}-gui-button`;
export const GUI_FRAME_NAME = `${MODE_NAME}-gui-frame`;
export const GUI_FLOW_NAME = `${MODE_NAME}-gui-flow`;
export const GUI_CONTENT_FLOW_NAME = `${MODE_NAME}-gui-content-flow`;
export const GUI_TITLEBAR_FLOW_NAME = `${MODE_NAME}-gui-titlebar-flow`;
export const GUI_RESET_NAME = `${MODE_NAME}-gui-reset`;
export const GUI_PREFIX_CHECKBOX = `${MODE_NAME}-gui-checkbox`;
export const GUI_PREFIX_TEXTFIELD = `${MODE_NAME}-gui-textfield`;
export const GUI_PREFIX_ELEM = `${MODE_NAME}-gui-elem`;
export const GUI_PREFIX_SLIDER = `${MODE_NAME}-gui-slider`;
export const GUI_LABEL_WIDTH = 100;
export const GUI_FIELD_WIDTH = 240;
