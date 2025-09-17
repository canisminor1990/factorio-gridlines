import { Color } from 'factorio:runtime';

import { chunky } from '../app/chunky';
import { clean } from '../app/clean';
import { BLOCK_SIZE, LAYERS_COUNT, MODE_NAME, SHORTCUT_NAME } from '../const';
import { add, makeLen2, mult } from '../utils';
import { Player } from './player';
import { ModSettings } from './settings';
import { storage } from './storage';

export class Gridlines {
  player: Player;
  constructor(player: Player) {
    this.player = player;
  }
  clean = () => {
    if (storage.init) {
      rendering.clear(MODE_NAME);
      this.player.resetData();
    } else {
      clean();
    }
  };
  draw = () => {
    const player = this.player;
    const modSettings = new ModSettings({
      global: settings.global,
      overrides: player.data.ui_overrides,
      player: player.settings,
    });

    const drawOnGround = modSettings.get('draw-on-ground') as boolean;
    const visible = player.raw.is_shortcut_toggled(SHORTCUT_NAME);

    // Do not create render objects when hidden or globally disabled
    if (!storage.enabled || !visible) return;

    for (let g = LAYERS_COUNT; g >= 1; g--) {
      const settingEnabled = modSettings.get('enabled', g) as boolean;
      if (!settingEnabled) continue;

      const color = modSettings.get('color', g) as Color;
      const thickness = modSettings.get('thickness', g) as number;

      const settingSize = modSettings.get('size', g) as number;
      const settingSpacing = modSettings.get('spacing', g) as number;
      const settingOffsetX = modSettings.get('offset-x', g) as number;
      const settingOffsetY = modSettings.get('offset-y', g) as number;

      const size = makeLen2([settingSize, settingSize]);

      const spacing = makeLen2([
        Math.min(settingSpacing, Math.floor(settingSize / 2)),
        Math.min(settingSpacing, Math.floor(settingSize / 2)),
      ]);

      const offset = makeLen2([
        Math.min(settingOffsetX, settingSize),
        Math.min(settingOffsetY, settingSize),
      ]);

      const showGrid = modSettings.get('show-grid', g) as boolean;
      const block = {
        bottomRight: mult(add(player.blockData.block_pos, [1, 1]), BLOCK_SIZE),
        topLeft: mult(player.blockData.block_pos, BLOCK_SIZE),
      };

      // Skip creating any grid lines when grid is disabled in settings
      if (settingSize > 0 && showGrid) {
        const lines = chunky({
          bottomRight: block.bottomRight,
          color,
          drawOnGround,
          offset,
          player: player.raw,
          size,
          spacing,
          surface: player.blockData.surface_index,
          thickness,
          topLeft: block.topLeft,
          visible: visible ? showGrid : false,
        });

        player.data.grids.push({
          group_index: g,
          lines: lines,
          surface_index: player.blockData.surface_index,
        });
      }

      // Draw centre mark independently of showGrid
      const showCentre = modSettings.get('show-centre', g) as boolean;
      const centreMarkSizeSetting = modSettings.get('centre-size', g) as number;

      if (
        centreMarkSizeSetting > 0 &&
        showCentre &&
        centreMarkSizeSetting < Math.min(Math.min(...size) - Math.min(...spacing) * 2)
      ) {
        const centreMarkSpacing: [number, number] = [
          Math.floor((size[0] - centreMarkSizeSetting) / 2),
          Math.floor((size[1] - centreMarkSizeSetting) / 2),
        ];
        const lines = chunky({
          bottomRight: block.bottomRight,
          color,
          drawOnGround,
          offset,
          player: player.raw,
          size,
          spacing: centreMarkSpacing,
          surface: player.raw.surface_index,
          thickness,
          topLeft: block.topLeft,
          visible: visible ? showCentre : false,
        });
        player.data.centres.push({
          group_index: g,
          lines: lines,
          surface_index: player.blockData.surface_index,
        });
      }
    }
  };

  refreshVisibility = () => {
    const player = this.player;
    const modSettings = new ModSettings({
      global: settings.global,
      overrides: player.data.ui_overrides,
      player: player.settings,
    });

    const visible = player.raw.is_shortcut_toggled(SHORTCUT_NAME) && storage.enabled;

    if (player.data.grids && player.data.grids.length > 0) {
      for (const item of player.data.grids) {
        const layerEnabled = modSettings.get('enabled', item.group_index) as boolean;
        const showGrid = modSettings.get('show-grid', item.group_index) as boolean;
        const shouldShow = visible && layerEnabled && showGrid;
        for (const line of item.lines) line.visible = shouldShow;
      }
    }

    if (player.data.centres && player.data.centres.length > 0) {
      for (const item of player.data.centres) {
        const layerEnabled = modSettings.get('enabled', item.group_index) as boolean;
        const showCentre = modSettings.get('show-centre', item.group_index) as boolean;
        const shouldShow = visible && layerEnabled && showCentre;
        for (const line of item.lines) line.visible = shouldShow;
      }
    }
  };
}
