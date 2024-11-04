import { LuaPlayer, PlayerIndex } from 'factorio:runtime';

import { DEFAULT_PLAYER_DATA } from '../const';
import { BlockData, PlayerData } from '../types';
import { storage } from './storage';

export class Player {
  index: PlayerIndex;
  settings: LuaPlayer['mod_settings'];
  raw: LuaPlayer;

  constructor(playerIndex: PlayerIndex) {
    this.index = playerIndex;
    this.raw = game.players[playerIndex];
    this.settings = this.raw.mod_settings;
  }

  get data(): PlayerData {
    if (!storage.players[this.index]) storage.players[this.index] = DEFAULT_PLAYER_DATA;
    return storage.players[this.index];
  }

  get blockData(): BlockData {
    return storage.mixed_surface_blocks[this.data.covered_block_count - 1];
  }

  init = () => {
    if (this.data.delete_lines && this.data.delete_lines.length > 0) {
      const blockset = this.data.delete_lines.pop()!;
      if (game.surfaces[blockset.surface_index] && game.surfaces[blockset.surface_index].valid) {
        for (const id of blockset.lines) id.destroy();
      }
    }

    if (!storage.surfaces[this.raw.surface.index]) storage.surfaces[this.raw.surface.index] = {};
  };

  resetData = () => {
    this.data.delete_lines = this.data.grids?.concat(this.data.centres || []);
    this.data.grids = [];
    this.data.centres = [];
    this.data.covered_block_count = 0;
  };
}
